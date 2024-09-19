type GitHubRepositoryType = {
  id: number;
  name: string;
  htmlUrl: string;
  defaultBranch: string;
  pushedAt: Date;
  owner: {
    login: string;
  };
  language?: string;
  private: boolean;
  cloneUrl: string;
};

export class GitHubRepository {
  id: number;
  name: string;
  htmlUrl: string;
  defaultBranch: string;
  pushedAt: Date;
  owner: {
    login: string;
  };
  language?: string;
  private: boolean;
  cloneUrl: string;

  constructor(params: GitHubRepositoryType) {
    this.id = params.id;
    this.name = params.name;
    this.htmlUrl = this.getUrlWithoutProtocol(params.htmlUrl);
    this.defaultBranch = params.defaultBranch;
    this.pushedAt = params.pushedAt;
    this.owner = params.owner;
    this.language = params.language;
    this.private = params.private;
    this.cloneUrl = params.cloneUrl;
  }

  private getUrlWithoutProtocol(url: string): string {
    return url.replace(/^https?:\/\//, "");
  }
}
