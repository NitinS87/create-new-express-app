/**
 * ORM and Database selection module for create-new-express-app CLI
 * Provides interactive prompts and validation for ORM and database choices
 */
import prompts from "prompts";
import pc from "picocolors";

export type ORM = "prisma" | "drizzle" | "none";
export type Database = "postgresql" | "mongodb" | "sqlserver";

export interface ORMDatabaseConfig {
  orm: ORM;
  database: Database | null;
}

/**
 * Check if the selected ORM-Database combination is supported
 */
function isValidORMDatabaseCombo(orm: ORM, database: Database): boolean {
  // Drizzle has limited database support initially
  if (orm === "drizzle") {
    // For now, we'll support PostgreSQL with Drizzle
    // Can be extended later
    return database === "postgresql";
  }

  // Prisma supports all listed databases
  if (orm === "prisma") {
    return true;
  }

  return true;
}

/**
 * Prompt the user to select an ORM
 */
export async function promptForORM(): Promise<ORM> {
  const response = await prompts({
    type: "select",
    name: "orm",
    message: "Which ORM would you like to use?",
    choices: [
      {
        title: "None - Skip ORM setup",
        value: "none",
        description: "Continue without an ORM",
      },
      {
        title: "Prisma - Modern TypeScript ORM",
        value: "prisma",
        description:
          "Auto-generated type-safe queries, migrations, supports PostgreSQL, MongoDB, SQL Server",
      },
      {
        title: "Drizzle - Lightweight TypeScript ORM",
        value: "drizzle",
        description:
          "Lightweight & performant, currently supports PostgreSQL in this CLI",
      },
    ],
    initial: 0,
  });

  return response.orm || "none";
}

/**
 * Prompt the user to select a database
 */
export async function promptForDatabase(orm: ORM): Promise<Database | null> {
  if (orm === "none") {
    return null;
  }

  // Filter available databases based on ORM
  const allDatabases = [
    {
      title: "PostgreSQL",
      value: "postgresql",
      description: "Open-source relational database",
    },
    {
      title: "MongoDB",
      value: "mongodb",
      description: "Document-oriented NoSQL database",
    },
    {
      title: "SQL Server",
      value: "sqlserver",
      description: "Microsoft SQL Server relational database",
    },
  ];

  let availableDatabases = allDatabases;
  let warningMessage = "";

  if (orm === "drizzle") {
    // Drizzle currently only supports PostgreSQL in this setup
    availableDatabases = allDatabases.filter(
      (db) => db.value === "postgresql"
    );
    warningMessage = pc.yellow(
      "\nNote: This CLI currently supports Drizzle only with PostgreSQL.\n" +
        "For other databases, consider using Prisma or manual Drizzle setup.\n"
    );
  }

  if (warningMessage) {
    console.log(warningMessage);
  }

  const response = await prompts({
    type: "select",
    name: "database",
    message: "Which database would you like to use?",
    choices: availableDatabases,
    initial: 0,
  });

  const selectedDatabase = response.database as Database;

  // Validate combination
  if (selectedDatabase && !isValidORMDatabaseCombo(orm, selectedDatabase)) {
    console.log(
      pc.red(
        `\n❌ ${orm} does not support ${selectedDatabase} in this CLI setup.`
      )
    );
    console.log(
      pc.yellow(
        "Please choose a different ORM or database, or set up manually after generation."
      )
    );
    return promptForDatabase(orm);
  }

  return selectedDatabase || null;
}

/**
 * Prompt for both ORM and database selection
 */
export async function promptForORMDatabase(): Promise<ORMDatabaseConfig> {
  const orm = await promptForORM();
  const database = await promptForDatabase(orm);

  return { orm, database };
}

/**
 * Get the dependencies needed for the selected ORM and database
 */
export function getORMDependencies(
  orm: ORM,
  database: Database | null
): { dependencies: string[]; devDependencies: string[] } {
  const deps: string[] = [];
  const devDeps: string[] = [];

  if (orm === "prisma" && database) {
    deps.push("@prisma/client");
    devDeps.push("prisma");

    // Add database-specific drivers if needed
    if (database === "mongodb") {
      // Prisma handles MongoDB internally
    } else if (database === "postgresql") {
      // Prisma handles PostgreSQL internally
    } else if (database === "sqlserver") {
      // Prisma handles SQL Server internally
    }
  } else if (orm === "drizzle" && database) {
    deps.push("drizzle-orm");
    devDeps.push("drizzle-kit");

    if (database === "postgresql") {
      deps.push("postgres");
    }
  }

  return { dependencies: deps, devDependencies: devDeps };
}

/**
 * Get the scripts to add to package.json for the selected ORM
 */
export function getORMScripts(orm: ORM): Record<string, string> {
  const scripts: Record<string, string> = {};

  if (orm === "prisma") {
    scripts["db:generate"] = "prisma generate";
    scripts["db:push"] = "prisma db push";
    scripts["db:migrate"] = "prisma migrate dev";
    scripts["db:seed"] = "tsx prisma/seed.ts";
    scripts["db:studio"] = "prisma studio";
  } else if (orm === "drizzle") {
    scripts["db:generate"] = "drizzle-kit generate";
    scripts["db:push"] = "drizzle-kit push";
    scripts["db:migrate"] = "drizzle-kit migrate";
    scripts["db:seed"] = "tsx src/db/seed.ts";
    scripts["db:studio"] = "drizzle-kit studio";
  }

  return scripts;
}
