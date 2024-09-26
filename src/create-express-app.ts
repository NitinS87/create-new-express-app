import fs from "fs-extra";
import path from "path";
import pc from "picocolors";
import { getPkgManager } from "./get-pkg-manager";
import { getOnline } from "./is-online";
import { install } from "./install";
import { tryGitInit } from "./git"; // Import the tryGitInit function

export async function createExpressApp(projectDirectory: string) {
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

    const packageManager = getPkgManager();
    const isOnline = await getOnline();

    console.log(pc.green(`Installing dependencies using ${packageManager}...`));
    await install(packageManager, isOnline);
    console.log(pc.green("Dependencies installed successfully."));

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
