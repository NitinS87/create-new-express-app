#!/usr/bin/env node

import { Command } from "commander";
import prompts from "prompts";
import pc from "picocolors";
import { createExpressApp } from "./create-express-app";

const program = new Command();

program
  .name("create-new-express-app")
  .description(
    "A CLI tool to create a TypeScript Express application with best practices"
  )
  .version("1.0.0")
  .argument("<project-directory>", "Directory to create the new Express app")
  .action(async (projectDirectory) => {
    const response = await prompts({
      type: "confirm",
      name: "value",
      message: `Do you want to create a new Express app in ${pc.green(
        projectDirectory
      )}?`,
      initial: true,
    });

    if (response.value) {
      createExpressApp(projectDirectory);
    } else {
      console.log(pc.red("Operation cancelled."));
    }
  });

program.parse(process.argv);
