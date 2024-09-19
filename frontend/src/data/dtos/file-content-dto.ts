type FileContentDtoType = {
  type: "file" | "dir";
  encoding: string;
  size: number;
  name: string;
  path: string;
  content?: string;
};

export class FileContentDto {
  type: "file" | "dir";
  encoding: string;
  size: number;
  name: string;
  path: string;
  content?: string;

  constructor(params: FileContentDtoType) {
    this.type = params.type;
    this.encoding = params.encoding;
    this.size = params.size;
    this.name = params.name;
    this.path = params.path;
    this.content = params.content;
  }
}
