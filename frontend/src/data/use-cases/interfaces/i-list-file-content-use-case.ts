import { FileContentDto } from "@/data/dtos/file-content-dto";
import { IUseCase } from "./i-use-case";
import { RepoWithCommitDto } from "@/data/dtos/repo-with-commit-dto";

export interface IListFileContentUseCase
  extends IUseCase<
    IListFileContentUseCase.Params,
    IListFileContentUseCase.Result
  > {}

export namespace IListFileContentUseCase {
  export type Params = {
    owner: string;
    repo: string;
    path: string;
  };

  export type Result = FileContentDto[];
}
