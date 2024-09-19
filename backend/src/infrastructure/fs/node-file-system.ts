import fs from "node:fs";
import { IFileSystem } from "../../application/interfaces/i-file-system";

export class NodeFileSystem implements IFileSystem {
  exists(path: string): boolean {
    return fs.existsSync(path);
  }
  createDirectory(path: string): void {
    console.log(`Creating directory: ${path}`);

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  }
  writeFile(path: string, content: string): void {
    console.log(`Writing file: ${path}`);

    fs.writeFileSync(path, content);
  }
  readFile(path: string): string {
    console.log(`Reading file: ${path}`);

    return fs.readFileSync(path, "utf8");
  }
  copyFile(src: string, dest: string): void {
    fs.copyFileSync(src, dest);
  }
}
