export interface IFileSystem {
  createDirectory(path: string): void;
  writeFile(path: string, content: string): void;
  readFile(path: string): string;
  copyFile(src: string, dest: string): void;
  exists(path: string): boolean;
}
