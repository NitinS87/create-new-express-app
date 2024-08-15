import * as fs from "fs";
import * as path from "path";
import { isWriteable } from "./is-writeable";
import { isFolderEmpty } from "./is-folder-empty";
import { copy } from "./copy";

export async function installTemplate(
  templateName: string,
  destinationPath: string
): Promise<void> {
  try {
    const templatePath = path.join(__dirname, "../templates", templateName);

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template ${templateName} does not exist.`);
    }

    if (!(await isWriteable(destinationPath))) {
      throw new Error(`Destination path ${destinationPath} is not writable.`);
    }

    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    if (!isFolderEmpty(destinationPath, templateName)) {
      throw new Error(`Destination path ${destinationPath} is not empty.`);
    }

    await copy(templatePath, destinationPath);

    console.log(
      `Template ${templateName} installed successfully to ${destinationPath}`
    );
  } catch (error: any) {
    console.error(`Failed to install template: ${error.message}`);
  }
}
