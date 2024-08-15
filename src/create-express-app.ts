import fs from "fs-extra";
import path from "path";
import pc from "picocolors";

export function createExpressApp(projectDirectory: string) {
  const templatePath = path.resolve(__dirname, "../templates/app-ts");
  const targetPath = path.resolve(process.cwd(), projectDirectory);

  try {
    fs.copySync(templatePath, targetPath);
    console.log(pc.green(`Express app created at ${targetPath}`));
  } catch (error: any) {
    console.error(pc.red(`Failed to create Express app: ${error.message}`));
  }
}
