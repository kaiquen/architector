import { IUseCase } from "../../i-use-case";

export type INewCodeServerUseCase = IUseCase<
  INewCodeServerUseCaseParams,
  INewCodeServerUseCaseResult
>;

export type INewCodeServerUseCaseParams = {
  repoUrl: string;
  githubLogin: string;
  githubToken: string;
};

export type INewCodeServerUseCaseResult = {
  url: string;
};
