import { GitHubService } from "../services/github-service";
import { IListFileContentUseCase } from "./interfaces/i-list-file-content-use-case";

export class ListFileContentUseCase implements IListFileContentUseCase {
  constructor(private readonly gitHubService: GitHubService) {}

  async execute(
    params: IListFileContentUseCase.Params
  ): Promise<IListFileContentUseCase.Result> {
    const response = await this.gitHubService.fetchFileContent(
      params.owner,
      params.repo,
      params.path
    );

    return response;
  }
}
