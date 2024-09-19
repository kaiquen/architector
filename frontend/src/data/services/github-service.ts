import {
  GitHubCommitResponseDto,
  GitHubCommitResponseDtoType,
} from "../dtos/github-commit-response-dto";
import { GithubFileContentDto } from "../dtos/github-file-content.dto";
import {
  GitHubRepoResponseDto,
  GitHubRepoResponseDtoType,
} from "../dtos/github-repo-response-dto";

export class GitHubService {
  constructor(private token: string) {}

  async fetchRepos(
    perPage: number,
    page: number
  ): Promise<{ repos: GitHubRepoResponseDto[]; totalPages: number }> {
    const response = await fetch(
      `https://api.github.com/user/repos?per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const linkHeader = response.headers.get("link");
    const totalPages = this.extractTotalPages(linkHeader);

    const repos: GitHubRepoResponseDtoType[] = await response.json();

    return {
      repos: repos.map((repo) => new GitHubRepoResponseDto(repo)),
      totalPages,
    };
  }

  async fetchLastCommit(
    owner: string,
    repo: string,
    branch: string
  ): Promise<GitHubCommitResponseDto> {
    console.log(owner, repo, branch);
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits/${branch}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch commit");
    }

    const commit: GitHubCommitResponseDtoType = await response.json();

    return new GitHubCommitResponseDto(commit);
  }

  async fetchFileContent(
    owner: string,
    repo: string,
    path?: string
  ): Promise<GithubFileContentDto[]> {
    console.log(repo, path);

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch file content");
    }

    const data: GithubFileContentDto | GithubFileContentDto[] =
      await response.json();

    if (!Array.isArray(data)) return [data];

    return data;
  }

  private extractTotalPages(linkHeader: string | null): number {
    if (!linkHeader) {
      return 1;
    }

    const links = linkHeader.split(",").map((link) => link.trim());

    const lastLink = links.find((link) => {
      console.log("Verificando link:", link);
      return link.includes('rel="last"');
    });

    console.log(lastLink);
    if (!lastLink) {
      return 1;
    }

    const match = lastLink.match(/page=(\d+)/);

    console.log(match);
    return match ? parseInt(match[1], 10) : 1;
  }
}
