#!/usr/bin/env node

import { Command } from "commander";
import prompts from "prompts";
import pc from "picocolors";
import { createExpressApp } from "./create-express-app";
import validateNpmPackageName from "validate-npm-package-name";

const program = new Command();

program
  .name("create-new-express-app")
  .description(
    "A CLI tool to create a TypeScript Express application with best practices"
  )
  .version("1.0.0")
  .argument("[project-directory]", "Directory to create the new Express app")
  .action(async (projectDirectory) => {
    if (!projectDirectory) {
      const response = await prompts({
        type: "text",
        name: "projectDirectory",
        message: "Please enter the project directory:",
      });
      projectDirectory = response.projectDirectory;
    }

    if (!projectDirectory) {
      console.log(pc.red("Project directory is required."));
      process.exit(1);
    }

    const validationResult = validateNpmPackageName(projectDirectory);
    if (!validationResult.validForNewPackages) {
      console.log(pc.red("Invalid npm package name:"));
      if (validationResult.errors) {
        validationResult.errors.forEach((error) =>
          console.log(pc.red(`  - ${error}`))
        );
      }
      if (validationResult.warnings) {
        validationResult.warnings.forEach((warning) =>
          console.log(pc.yellow(`  - ${warning}`))
        );
      }
      process.exit(1);
    }

    const confirmResponse = await prompts({
      type: "confirm",
      name: "value",
      message: `Do you want to create a new Express app in ${pc.green(
        projectDirectory
      )}?`,
      initial: true,
    });

    if (confirmResponse.value) {
      createExpressApp(projectDirectory);
    } else {
      console.log(pc.red("Operation cancelled."));
    }
  });

// Add help option
program.on("--help", () => {
  console.log("");
  console.log("Examples:");
  console.log("  $ create-new-express-app my-app");
  console.log("  $ create-new-express-app");
});

program.parse(process.argv);
