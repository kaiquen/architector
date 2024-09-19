import { CreateProjectUseCase } from "../../application/use-case/project/create-project-use-case";
import { NodeFileSystem } from "../../infrastructure/fs/node-file-system";

export class Project {
  constructor(
    public name: string,
    public description: string,
    public author: string
  ) {}
}


new CreateProjectUseCase( new NodeFileSystem());