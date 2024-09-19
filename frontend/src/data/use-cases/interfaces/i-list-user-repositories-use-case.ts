import { IUseCase } from "./i-use-case";
import { RepoWithCommitDto } from "@/data/dtos/repo-with-commit-dto";

export interface IListUserRepositoriesUseCase
  extends IUseCase<
    IListUserRepositoriesUseCase.Params,
    IListUserRepositoriesUseCase.Result
  > {}

export namespace IListUserRepositoriesUseCase {
  export type Params = {
    perPage: number;
    page: number;
  };

  export type Result = { repos: RepoWithCommitDto[]; totalPages: number };
}
