import prompts from "prompts";
import spawn from "cross-spawn";
import pc from "picocolors";

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

/**
 * Detect the package manager from the environment
 * @returns The detected package manager
 */
export function detectPackageManager(): PackageManager {
  const userAgent = process.env.npm_config_user_agent || "";

  if (userAgent.startsWith("yarn")) {
    return "yarn";
  }

  if (userAgent.startsWith("pnpm")) {
    return "pnpm";
  }

  if (userAgent.startsWith("bun")) {
    return "bun";
  }

  return "npm";
}

/**
 * Prompt the user to select a package manager
 * @param defaultManager The default package manager to suggest
 * @returns A Promise that resolves to the selected package manager
 */
export async function promptForPackageManager(
  defaultManager?: PackageManager
): Promise<PackageManager> {
  const detected = defaultManager || detectPackageManager();

  const response = await prompts({
    type: "select",
    name: "packageManager",
    message: "Which package manager would you like to use?",
    choices: [
      {
        title: "Auto-detect (detected: " + detected + ")",
        value: "detect",
      },
      { title: "npm", value: "npm" },
      { title: "pnpm", value: "pnpm" },
      { title: "yarn", value: "yarn" },
      { title: "bun", value: "bun" },
    ],
    initial: 0,
  });

  // If user selects auto-detect or cancels (undefined), use detected
  if (!response.packageManager || response.packageManager === "detect") {
    return detected;
  }

  return response.packageManager as PackageManager;
}

/**
 * Install dependencies using the specified package manager
 * @param projectPath Path to the project directory
 * @param chosenManager The package manager to use
 * @returns A Promise that resolves when installation is complete
 */
export async function installDependencies(
  projectPath: string,
  chosenManager: PackageManager
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      console.log(
        pc.green(`Installing dependencies using ${chosenManager}...`)
      );

      // Build the install command based on the package manager
      let installCmd: string[];

      switch (chosenManager) {
        case "yarn":
          installCmd = ["install"];
          break;
        case "pnpm":
          installCmd = ["install"];
          break;
        case "bun":
          installCmd = ["install"];
          break;
        case "npm":
        default:
          installCmd = ["install"];
          break;
      }

      // Run install command
      const child = spawn(chosenManager, installCmd, {
        cwd: projectPath,
        stdio: "inherit",
        env: {
          ...process.env,
          ADBLOCK: "1",
          NODE_ENV: "development",
          DISABLE_OPENCOLLECTIVE: "1",
        },
      });

      child.on("close", (code) => {
        if (code !== 0) {
          reject(
            new Error(
              `${chosenManager} ${installCmd.join(" ")} exited with code ${code}`
            )
          );
          return;
        }
        resolve();
      });

      child.on("error", (error) => {
        reject(error);
      });
    } catch (error: unknown) {
      reject(error);
    }
  });
}
