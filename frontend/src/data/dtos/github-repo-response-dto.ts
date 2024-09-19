export type GitHubRepoResponseDtoType = {
  id: number;
  name: string;
  html_url: string;
  default_branch: string;
  pushed_at: Date;
  owner: {
    login: string;
  };
  language?: string;
  private: boolean;
  clone_url: string;
};

export class GitHubRepoResponseDto {
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

  constructor(params: GitHubRepoResponseDtoType) {
    this.id = params.id;
    this.name = params.name;
    this.htmlUrl = params.html_url;
    this.defaultBranch = params.default_branch;
    this.pushedAt = new Date(params.pushed_at);
    this.owner = params.owner;
    this.language = params.language;
    this.private = params.private;
    this.cloneUrl = params.clone_url;
  }
}
