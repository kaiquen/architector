import { GitHubCommit } from "@/domain/entities/github-commit";
import { GitHubRepository } from "@/domain/entities/github-repository";

export class RepoWithCommitDto {
  id: number;
  owner: string;
  name: string;
  htmlUrl: string;
  defaultBranch: string;
  pushedAt: Date;
  private: boolean;
  language?: string;
  cloneUrl: string;
  commit: {
    message: string;
    url: string;
    author: {
      name: string;
      date: Date;
    };
  };

  constructor(repo: GitHubRepository, commit: GitHubCommit) {
    this.id = repo.id;
    this.owner = repo.owner.login;
    this.name = repo.name;
    this.htmlUrl = repo.htmlUrl;
    this.defaultBranch = repo.defaultBranch;
    this.pushedAt = new Date(repo.pushedAt);
    this.commit = commit;
    this.private = repo.private;
    this.language = repo.language;
    this.cloneUrl = repo.cloneUrl;
  }
}
