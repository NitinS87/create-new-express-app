import { execSync } from "node:child_process";
import { join } from "node:path";
import { rmSync, existsSync, renameSync } from "node:fs";
import pc from "picocolors";

function isInGitRepository(): boolean {
  try {
    execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
    console.log(pc.green("Already in a Git repository."));
    return true;
  } catch (_) {}
  return false;
}

function isInMercurialRepository(): boolean {
  try {
    execSync("hg --cwd . root", { stdio: "ignore" });
    console.log(pc.green("Already in a Mercurial repository."));
    return true;
  } catch (_) {}
  return false;
}

function isDefaultBranchSet(): boolean {
  try {
    execSync("git config init.defaultBranch", { stdio: "ignore" });
    return true;
  } catch (_) {}
  return false;
}

export function tryGitInit(root: string): boolean {
  let didInit = false;
  try {
    execSync("git --version", { stdio: "ignore" });
    console.log(pc.green("Git is available."));
    if (isInGitRepository() || isInMercurialRepository()) {
      return false;
    }

    console.log(pc.green("Initializing a new Git repository..."));
    execSync("git init", { stdio: "ignore" });
    didInit = true;

    if (!isDefaultBranchSet()) {
      execSync("git checkout -b main", { stdio: "ignore" });
    }

    // Check if .gitignore-copy exists
    const gitignoreCopyPath = join(root, ".gitignore-copy");
    const gitignorePath = join(root, ".gitignore");
    if (!existsSync(gitignoreCopyPath)) {
      console.log(pc.red(`File ${gitignoreCopyPath} does not exist.`));
      throw new Error(`File ${gitignoreCopyPath} does not exist.`);
    }

    // Rename .gitignore-copy to .gitignore using fs.renameSync
    renameSync(gitignoreCopyPath, gitignorePath);

    execSync("git add -A", { stdio: "ignore" });
    execSync('git commit -m "Initial commit from Create New Express App"', {
      stdio: "ignore",
    });
    return true;
  } catch (e) {
    console.log(pc.red("Git repo not initialized"), e);
    if (didInit) {
      console.log(pc.red("Removing .git directory..."));
      try {
        rmSync(join(root, ".git"), { recursive: true, force: true });
        console.log(pc.green(".git directory removed successfully."));
      } catch (_) {
        console.log(pc.red("Failed to remove .git directory."));
      }
    }
    return false;
  }
}
