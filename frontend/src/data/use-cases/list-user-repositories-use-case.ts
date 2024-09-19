import { GitHubRepository } from "@/domain/entities/github-repository";
import { RepoWithCommitDto } from "../dtos/repo-with-commit-dto";
import { GitHubService } from "../services/github-service";
import { IListUserRepositoriesUseCase } from "./interfaces/i-list-user-repositories-use-case";
import { GitHubCommit } from "@/domain/entities/github-commit";

export class ListUserRepositoriesUseCase
  implements IListUserRepositoriesUseCase
{
  constructor(private readonly gitHubService: GitHubService) {}
  async execute(
    params: IListUserRepositoriesUseCase.Params
  ): Promise<IListUserRepositoriesUseCase.Result> {
    const { repos, totalPages } = await this.gitHubService.fetchRepos(
      params.perPage,
      params.page
    );

    // const filteredRepos = repos.filter(
    //   (repo) => repo.language?.toLowerCase() === "typescript"
    // );

    const reposWithCommits = await Promise.all(
      repos.map(async (repo) => {
        const commit = await this.gitHubService.fetchLastCommit(
          repo.owner.login,
          repo.name,
          repo.defaultBranch
        );

        return new RepoWithCommitDto(
          new GitHubRepository({
            id: repo.id,
            name: repo.name,
            defaultBranch: repo.defaultBranch,
            htmlUrl: repo.htmlUrl,
            owner: repo.owner,
            pushedAt: repo.pushedAt,
            language: repo.language,
            private: repo.private,
            cloneUrl: repo.cloneUrl,
          }),
          new GitHubCommit({
            author: commit.author,
            message: commit.message,
            url: commit.url,
          })
        );
      })
    );

    return { repos: reposWithCommits, totalPages };
  }
}
