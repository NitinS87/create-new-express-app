/* eslint-disable import/no-extraneous-dependencies */
import { mkdirSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { green, cyan } from "picocolors";
import { isFolderEmpty } from "./is-folder-empty";
import type { PackageManager } from "./get-pkg-manager";
import { tryGitInit } from "./git";
import { isWriteable } from "./is-writeable";
import { getOnline } from "./is-online";
import { installTemplate } from "./install-template";
import { TemplateMode, TemplateType } from "./types";

export class DownloadError extends Error {}

export async function createApp({
  appPath,
  packageManager,
  typescript,
  tailwind,
  eslint,
  app,
  srcDir,
  importAlias,
  skipInstall,
  empty,
  turbo,
}: {
  appPath: string;
  packageManager: PackageManager;
  typescript: boolean;
  tailwind: boolean;
  eslint: boolean;
  app: boolean;
  srcDir: boolean;
  importAlias: string;
  skipInstall: boolean;
  empty: boolean;
  turbo: boolean;
}): Promise<void> {
  const mode: TemplateMode = typescript ? "ts" : "js";
  const template: TemplateType = "app-ts";
  // const template: TemplateType = `${app ? "app" : "default"}${
  //   tailwind ? "-tw" : ""
  // }${empty ? "-empty" : ""}`;

  const root = resolve(appPath);

  if (!(await isWriteable(dirname(root)))) {
    console.error(
      "The application path is not writable, please check folder permissions and try again."
    );
    console.error(
      "It is likely you do not have write permissions for this folder."
    );
    process.exit(1);
  }

  const appName = basename(root);

  mkdirSync(root, { recursive: true });
  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  const useYarn = packageManager === "yarn";
  const isOnline = !useYarn || (await getOnline());
  const originalDirectory = process.cwd();

  console.log(`Creating a new Next.js app in ${green(root)}.`);
  console.log();

  process.chdir(root);

  const packageJsonPath = join(root, "package.json");
  let hasPackageJson = false;

  /**
   * If an example repository is not provided for cloning, proceed
   * by installing from a template.
   */
  await installTemplate(template, root);

  if (tryGitInit(root)) {
    console.log("Initialized a git repository.");
    console.log();
  }

  let cdpath: string;
  if (join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  console.log(`${green("Success!")} Created ${appName} at ${appPath}`);

  if (hasPackageJson) {
    console.log("Inside that directory, you can run several commands:");
    console.log();
    console.log(cyan(`  ${packageManager} ${useYarn ? "" : "run "}dev`));
    console.log("    Starts the development server.");
    console.log();
    console.log(cyan(`  ${packageManager} ${useYarn ? "" : "run "}build`));
    console.log("    Builds the app for production.");
    console.log();
    console.log(cyan(`  ${packageManager} start`));
    console.log("    Runs the built app in production mode.");
    console.log();
    console.log("We suggest that you begin by typing:");
    console.log();
    console.log(cyan("  cd"), cdpath);
    console.log(`  ${cyan(`${packageManager} ${useYarn ? "" : "run "}dev`)}`);
  }
  console.log();
}
