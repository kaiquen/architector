type GitHubCommitType = {
  message: string;
  url: string;
  author: {
    name: string;
    date: Date;
  };
};

export class GitHubCommit {
  message: string;
  url: string;
  author: {
    name: string;
    date: Date;
  };

  constructor(params: GitHubCommitType) {
    this.message = params.message;
    this.url = params.url;
    this.author = params.author;
  }
}
