import fs from "fs-extra";
import path from "path";
import pc from "picocolors";
import {
  promptForPackageManager,
  installDependencies,
  type PackageManager,
} from "./cli/package-manager";
import { promptForORMDatabase } from "./cli/orm-database";
import { scaffoldORM, patchPackageJson } from "./scaffold-orm";
import { tryGitInit } from "./git"; // Import the tryGitInit function

export async function createExpressApp(
  projectDirectory: string,
  shouldInstall: boolean = true
) {
  const templatePath = path.resolve(__dirname, "../templates/app-ts");
  const targetPath = path.resolve(process.cwd(), projectDirectory);

  try {
    // const writable = await isWriteable(targetPath);
    // if (!writable) {
    //   console.error(pc.red(`The directory ${targetPath} is not writable.`));
    //   return;
    // }

    fs.copySync(templatePath, targetPath, { dereference: true });
    console.log(pc.green(`Express app created at ${targetPath}`));

    process.chdir(targetPath); // Change the current working directory to the target path

    // Prompt for ORM and database selection
    const { orm, database } = await promptForORMDatabase();

    // Scaffold ORM files
    await scaffoldORM(targetPath, orm, database);

    // Patch package.json with ORM dependencies and scripts
    await patchPackageJson(targetPath, orm, database);

    let packageManager: PackageManager;

    if (shouldInstall) {
      // Prompt user for package manager
      packageManager = await promptForPackageManager();

      // Install dependencies
      await installDependencies(targetPath, packageManager);
      console.log(pc.green("Dependencies installed successfully."));

      // Show ORM-specific next steps
      if (orm !== "none" && database) {
        console.log(pc.green("\n📦 Database setup next steps:"));
        console.log(pc.cyan("1. Update DATABASE_URL in .env file"));
        if (orm === "prisma") {
          console.log(
            pc.cyan(`2. Run: ${packageManager} run db:push (to push schema)`)
          );
          console.log(
            pc.cyan(`3. Run: ${packageManager} run db:seed (to seed data)`)
          );
        } else if (orm === "drizzle") {
          console.log(
            pc.cyan(
              `2. Run: ${packageManager} run db:generate (to generate migrations)`
            )
          );
          console.log(
            pc.cyan(
              `3. Run: ${packageManager} run db:push (to apply migrations)`
            )
          );
          console.log(
            pc.cyan(`4. Run: ${packageManager} run db:seed (to seed data)`)
          );
        }
      }
    } else {
      console.log(
        pc.yellow(
          "Skipping dependency installation. Run your package manager's install command manually."
        )
      );
      packageManager = "npm"; // Default for display purposes

      if (orm !== "none" && database) {
        console.log(
          pc.yellow(
            "\n📦 Remember to install dependencies and set up your database!"
          )
        );
      }
    }

    // Initialize Git repository
    const gitInitialized = tryGitInit(targetPath);
    if (gitInitialized) {
      console.log(pc.green("Initialized a new Git repository."));
    } else {
      console.log(pc.red("Failed to initialize a Git repository."));
    }

    console.log(
      pc.green(
        "You can now start your development server by running the following commands:"
      )
    );
    console.log(pc.cyan(`cd ${projectDirectory}`));
    console.log(pc.cyan(`${packageManager} run dev`));
    console.log(pc.green("Happy coding!"));
  } catch (error: any) {
    console.error(pc.red(`Failed to create Express app: ${error.message}`));
  }
}
