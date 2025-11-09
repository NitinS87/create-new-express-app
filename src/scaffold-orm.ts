import fs from "fs-extra";
import path from "path";
import pc from "picocolors";
import type { ORM, Database } from "./cli/orm-database";
import { getORMDependencies, getORMScripts } from "./cli/orm-database";

/**
 * Scaffold ORM-specific files based on the selected ORM and database
 */
export async function scaffoldORM(
  targetPath: string,
  orm: ORM,
  database: Database | null
): Promise<void> {
  if (orm === "none" || !database) {
    return;
  }

  console.log(pc.green(`Scaffolding ${orm} with ${database}...`));

  try {
    if (orm === "prisma") {
      await scaffoldPrisma(targetPath, database);
    } else if (orm === "drizzle") {
      await scaffoldDrizzle(targetPath, database);
    }

    console.log(pc.green(`${orm} scaffolding completed successfully.`));
  } catch (error: any) {
    console.error(pc.red(`Failed to scaffold ${orm}: ${error.message}`));
    throw error;
  }
}

/**
 * Scaffold Prisma ORM files
 */
async function scaffoldPrisma(
  targetPath: string,
  database: Database
): Promise<void> {
  const templateName = `prisma-${database}`;
  const templatePath = path.resolve(
    __dirname,
    `../templates/${templateName}`
  );
  const prismaPath = path.join(targetPath, "prisma");

  // Create prisma directory
  fs.ensureDirSync(prismaPath);

  // Copy schema.prisma
  const schemaSource = path.join(templatePath, "schema.prisma");
  const schemaTarget = path.join(prismaPath, "schema.prisma");
  fs.copyFileSync(schemaSource, schemaTarget);

  // Copy seed.ts
  const seedSource = path.join(templatePath, "seed.ts");
  const seedTarget = path.join(prismaPath, "seed.ts");
  fs.copyFileSync(seedSource, seedTarget);

  console.log(pc.cyan("  ✓ Created prisma/schema.prisma"));
  console.log(pc.cyan("  ✓ Created prisma/seed.ts"));

  // Update .env.example with DATABASE_URL
  updateEnvExample(targetPath, database, "prisma");
}

/**
 * Scaffold Drizzle ORM files
 */
async function scaffoldDrizzle(
  targetPath: string,
  database: Database
): Promise<void> {
  const templateName = `drizzle-${database}`;
  const templatePath = path.resolve(
    __dirname,
    `../templates/${templateName}`
  );

  // Copy drizzle.config.ts to root
  const configSource = path.join(templatePath, "drizzle.config.ts");
  const configTarget = path.join(targetPath, "drizzle.config.ts");
  fs.copyFileSync(configSource, configTarget);

  console.log(pc.cyan("  ✓ Created drizzle.config.ts"));

  // Copy db directory to src/
  const dbDirSource = path.join(templatePath, "src/db");
  const dbDirTarget = path.join(targetPath, "src/db");

  fs.ensureDirSync(dbDirTarget);
  fs.copySync(dbDirSource, dbDirTarget);

  console.log(pc.cyan("  ✓ Created src/db/schema.ts"));
  console.log(pc.cyan("  ✓ Created src/db/index.ts"));
  console.log(pc.cyan("  ✓ Created src/db/seed.ts"));

  // Update .env.example with DATABASE_URL
  updateEnvExample(targetPath, database, "drizzle");
}

/**
 * Update .env.example file with DATABASE_URL
 */
function updateEnvExample(
  targetPath: string,
  database: Database,
  orm: ORM
): void {
  const envExamplePath = path.join(targetPath, ".env.example");

  let databaseUrlExample = "";
  if (database === "postgresql") {
    databaseUrlExample =
      "DATABASE_URL=postgresql://user:password@localhost:5432/dbname";
  } else if (database === "mongodb") {
    databaseUrlExample =
      "DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/dbname";
  } else if (database === "sqlserver") {
    databaseUrlExample =
      "DATABASE_URL=sqlserver://localhost:1433;database=dbname;user=sa;password=yourPassword;encrypt=true";
  }

  // Check if .env.example exists
  if (fs.existsSync(envExamplePath)) {
    // Read current content
    let envContent = fs.readFileSync(envExamplePath, "utf-8");

    // Add DATABASE_URL if not present
    if (!envContent.includes("DATABASE_URL")) {
      envContent += `\n# Database Configuration (${orm} with ${database})\n${databaseUrlExample}\n`;
      fs.writeFileSync(envExamplePath, envContent);
      console.log(pc.cyan("  ✓ Updated .env.example with DATABASE_URL"));
    }
  }
}

/**
 * Patch package.json to add ORM dependencies and scripts
 */
export async function patchPackageJson(
  targetPath: string,
  orm: ORM,
  database: Database | null
): Promise<void> {
  if (orm === "none" || !database) {
    return;
  }

  console.log(pc.green("Updating package.json..."));

  const packageJsonPath = path.join(targetPath, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    console.error(pc.red("package.json not found in target directory"));
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  // Get dependencies for the ORM
  const { dependencies, devDependencies } = getORMDependencies(orm, database);

  // Add dependencies
  if (!packageJson.dependencies) {
    packageJson.dependencies = {};
  }
  dependencies.forEach((dep) => {
    // Use latest version placeholder - will be resolved during npm install
    packageJson.dependencies[dep] = "latest";
  });

  // Add devDependencies
  if (!packageJson.devDependencies) {
    packageJson.devDependencies = {};
  }
  devDependencies.forEach((dep) => {
    packageJson.devDependencies[dep] = "latest";
  });

  // Add tsx for running TypeScript seed files
  if (!packageJson.devDependencies["tsx"]) {
    packageJson.devDependencies["tsx"] = "latest";
  }

  // Add scripts
  const ormScripts = getORMScripts(orm);
  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }
  Object.assign(packageJson.scripts, ormScripts);

  // Write updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log(pc.cyan(`  ✓ Added ${orm} dependencies`));
  console.log(pc.cyan(`  ✓ Added ${orm} scripts`));
}
