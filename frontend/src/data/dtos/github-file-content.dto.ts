type GithubFileContentDtoType = {
  type: "file" | "dir";
  encoding: string;
  size: number;
  name: string;
  path: string;
  content: string;
};

export class GithubFileContentDto {
  type: "file" | "dir";
  encoding: string;
  size: number;
  name: string;
  path: string;
  content: string;

  constructor(params: GithubFileContentDtoType) {
    this.type = params.type;
    this.encoding = params.encoding;
    this.size = params.size;
    this.name = params.name;
    this.path = params.path;
    this.content = params.content;
  }
}
