export type GitHubCommitResponseDtoType = {
  commit: {
    message: string;
    url: string;
    author: {
      name: string;
      date: Date;
    };
  };
};

export class GitHubCommitResponseDto {
  message: string;
  url: string;
  author: {
    name: string;
    date: Date;
  };

  constructor(params: GitHubCommitResponseDtoType) {
    this.message = params.commit.message;
    this.url = params.commit.url;
    this.author = {
      name: params.commit.author.name,
      date: new Date(params.commit.author.date),
    };
  }
}
