#!/usr/bin/env node

import { Command } from "commander";
import { basename, resolve } from "node:path";
import { existsSync } from "node:fs";
import { cyan, green, red, bold, yellow, blue } from "picocolors";
import Conf from "conf";
import updateCheck from "update-check";
import ciInfo from "ci-info";
import prompts, { type InitialReturnValue } from "prompts";
import packageJson from "./package.json";
import { getPkgManager, type PackageManager } from "./helpers/get-pkg-manager";
import { validateNpmName } from "./helpers/validate-pkg";
import { isFolderEmpty } from "./helpers/is-folder-empty";
import { createApp, DownloadError } from "./create-app";

let projectPath: string = "";

const handleSigTerm = () => process.exit(0);

process.on("SIGINT", handleSigTerm);
process.on("SIGTERM", handleSigTerm);

const onPromptState = (state: {
  value: InitialReturnValue;
  aborted: boolean;
  exited: boolean;
}) => {
  if (state.aborted) {
    // If we don't re-enable the terminal cursor before exiting
    // the program, the cursor will remain hidden
    process.stdout.write("\x1B[?25h");
    process.stdout.write("\n");
    process.exit(1);
  }
};

const program = new Command(packageJson.name)
  .description(packageJson.description)
  .version(
    packageJson.version,
    "-v, --version",
    "Output the current version of create-new-express-app"
  )
  .argument("[directory]")
  .usage("[directory] [options]")
  .helpOption("-h, --help", "Display this help message.")
  .action((name) => {
    // Commander does not implicitly support negated options. When they are used
    // by the user they will be interpreted as the positional argument (name) in
    // the action handler. See https://github.com/tj/commander.js/pull/1355
    if (name && !name.startsWith("--no-")) {
      projectPath = name;
    }
  })
  .allowUnknownOption()
  .parse(process.argv);

const opts = program.opts();
const { args } = program;

const packageManager: PackageManager = !!opts.useNpm
  ? "npm"
  : !!opts.usePnpm
  ? "pnpm"
  : !!opts.useYarn
  ? "yarn"
  : !!opts.useBun
  ? "bun"
  : getPkgManager();

async function run(): Promise<void> {
  const conf = new Conf({ projectName: "create-new-express-app" });

  if (opts.resetPreferences) {
    const { resetPreferences } = await prompts({
      onState: onPromptState,
      type: "toggle",
      name: "resetPreferences",
      message: "Would you like to reset the saved preferences?",
      initial: false,
      active: "Yes",
      inactive: "No",
    });
    if (resetPreferences) {
      conf.clear();
      console.log("The preferences have been reset successfully!");
    }
    process.exit(0);
  }

  if (typeof projectPath === "string") {
    projectPath = projectPath.trim();
  }

  if (!projectPath) {
    const res = await prompts({
      onState: onPromptState,
      type: "text",
      name: "path",
      message: "What is your project named?",
      initial: "my-app",
      validate: (name) => {
        const validation = validateNpmName(basename(resolve(name)));
        if (validation.valid) {
          return true;
        }
        return "Invalid project name: " + validation.problems[0];
      },
    });

    if (typeof res.path === "string") {
      projectPath = res.path.trim();
    }
  }

  if (!projectPath) {
    console.log(
      "\nPlease specify the project directory:\n" +
        `  ${cyan(opts.name())} ${green("<project-directory>")}\n` +
        "For example:\n" +
        `  ${cyan(opts.name())} ${green("my-express-app")}\n\n` +
        `Run ${cyan(`${opts.name()} --help`)} to see all options.`
    );
    process.exit(1);
  }

  const appPath = resolve(projectPath);
  const appName = basename(appPath);

  const validation = validateNpmName(appName);
  if (!validation.valid) {
    console.error(
      `Could not create a project called ${red(
        `"${appName}"`
      )} because of npm naming restrictions:`
    );

    validation.problems.forEach((p) =>
      console.error(`    ${red(bold("*"))} ${p}`)
    );
    process.exit(1);
  }

  if (existsSync(appPath) && !isFolderEmpty(appPath, appName)) {
    process.exit(1);
  }

  const preferences = (conf.get("preferences") || {}) as Record<
    string,
    boolean | string
  >;

  /**
   * If the user does not provide the necessary flags, prompt them for their
   * preferences, unless `--yes` option was specified, or when running in CI.
   */
  const skipPrompt = ciInfo.isCI || opts.yes;

  const defaults: typeof preferences = {
    typescript: true,
    eslint: true,
    srcDir: true,
    importAlias: "@/*",
    customizeImportAlias: false,
  };
  const getPrefOrDefault = (field: string) =>
    preferences[field] ?? defaults[field];

  if (!opts.typescript && !opts.javascript) {
    if (skipPrompt) {
      // default to TypeScript in CI as we can't prompt to
      // prevent breaking setup flows
      opts.typescript = getPrefOrDefault("typescript");
    } else {
      const styledTypeScript = blue("TypeScript");
      const { typescript } = await prompts(
        {
          type: "toggle",
          name: "typescript",
          message: `Would you like to use ${styledTypeScript}?`,
          initial: getPrefOrDefault("typescript"),
          active: "Yes",
          inactive: "No",
        },
        {
          /**
           * User inputs Ctrl+C or Ctrl+D to exit the prompt. We should close the
           * process and not write to the file system.
           */
          onCancel: () => {
            console.error("Exiting.");
            process.exit(1);
          },
        }
      );
      /**
       * Depending on the prompt response, set the appropriate program flags.
       */
      opts.typescript = Boolean(typescript);
      opts.javascript = !Boolean(typescript);
      preferences.typescript = Boolean(typescript);
    }
  }

  if (!opts.eslint && !args.includes("--no-eslint")) {
    if (skipPrompt) {
      opts.eslint = getPrefOrDefault("eslint");
    } else {
      const styledEslint = blue("ESLint");
      const { eslint } = await prompts({
        onState: onPromptState,
        type: "toggle",
        name: "eslint",
        message: `Would you like to use ${styledEslint}?`,
        initial: getPrefOrDefault("eslint"),
        active: "Yes",
        inactive: "No",
      });
      opts.eslint = Boolean(eslint);
      preferences.eslint = Boolean(eslint);
    }
  }

  if (!opts.srcDir && !args.includes("--no-src-dir")) {
    if (skipPrompt) {
      opts.srcDir = getPrefOrDefault("srcDir");
    } else {
      const styledSrcDir = blue("`src/` directory");
      const { srcDir } = await prompts({
        onState: onPromptState,
        type: "toggle",
        name: "srcDir",
        message: `Would you like your code inside a ${styledSrcDir}?`,
        initial: getPrefOrDefault("srcDir"),
        active: "Yes",
        inactive: "No",
      });
      opts.srcDir = Boolean(srcDir);
      preferences.srcDir = Boolean(srcDir);
    }
  }

  const importAliasPattern = /^[^*"]+\/\*\s*$/;
  if (
    typeof opts.importAlias !== "string" ||
    !importAliasPattern.test(opts.importAlias)
  ) {
    if (skipPrompt) {
      // We don't use preferences here because the default value is @/* regardless of existing preferences
      opts.importAlias = defaults.importAlias;
    } else if (args.includes("--no-import-alias")) {
      opts.importAlias = defaults.importAlias;
    } else {
      const styledImportAlias = blue("import alias");

      const { customizeImportAlias } = await prompts({
        onState: onPromptState,
        type: "toggle",
        name: "customizeImportAlias",
        message: `Would you like to customize the ${styledImportAlias} (${defaults.importAlias} by default)?`,
        initial: getPrefOrDefault("customizeImportAlias"),
        active: "Yes",
        inactive: "No",
      });

      if (!customizeImportAlias) {
        // We don't use preferences here because the default value is @/* regardless of existing preferences
        opts.importAlias = defaults.importAlias;
      } else {
        const { importAlias } = await prompts({
          onState: onPromptState,
          type: "text",
          name: "importAlias",
          message: `What ${styledImportAlias} would you like configured?`,
          initial: getPrefOrDefault("importAlias"),
          validate: (value) =>
            importAliasPattern.test(value)
              ? true
              : "Import alias must follow the pattern <prefix>/*",
        });
        opts.importAlias = importAlias;
        preferences.importAlias = importAlias;
      }
    }
  }

  try {
    await createApp({
      appPath,
      packageManager,
      typescript: opts.typescript,
      eslint: opts.eslint,
      tailwind: opts.tailwind,
      app: opts.app,
      srcDir: opts.srcDir,
      importAlias: opts.importAlias,
      skipInstall: opts.skipInstall,
      empty: opts.empty,
      turbo: opts.turbo,
    });
  } catch (reason) {
    if (!(reason instanceof DownloadError)) {
      throw reason;
    }

    const res = await prompts({
      onState: onPromptState,
      type: "confirm",
      name: "builtin",
      message:
        `Could not download github because of a connectivity issue between your machine and GitHub.\n` +
        `Do you want to use the default template instead?`,
      initial: true,
    });
    if (!res.builtin) {
      throw reason;
    }

    await createApp({
      appPath,
      packageManager,
      typescript: opts.typescript,
      eslint: opts.eslint,
      tailwind: opts.tailwind,
      app: opts.app,
      srcDir: opts.srcDir,
      importAlias: opts.importAlias,
      skipInstall: opts.skipInstall,
      empty: opts.empty,
      turbo: opts.turbo,
    });
  }
  conf.set("preferences", preferences);
}

const update = updateCheck(packageJson).catch(() => null);

async function notifyUpdate(): Promise<void> {
  try {
    if ((await update)?.latest) {
      const global = {
        npm: "npm i -g",
        yarn: "yarn global add",
        pnpm: "pnpm add -g",
        bun: "bun add -g",
      };
      const updateMessage = `${global[packageManager]} create-new-express-app`;
      console.log(
        yellow(
          bold("A new version of `create-new-express-app` is available!")
        ) +
          "\n" +
          "You can update by running: " +
          cyan(updateMessage) +
          "\n"
      );
    }
    process.exit(0);
  } catch {
    // ignore error
  }
}

async function exit(reason: { command?: string }) {
  console.log();
  console.log("Aborting installation.");
  if (reason.command) {
    console.log(`  ${cyan(reason.command)} has failed.`);
  } else {
    console.log(
      red("Unexpected error. Please report it as a bug:") + "\n",
      reason
    );
  }
  console.log();
  await notifyUpdate();
  process.exit(1);
}

run().then(notifyUpdate).catch(exit);
