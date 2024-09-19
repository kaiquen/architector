export interface IContainerService {
  startContainer(
    repoUrl: string,
    githubLogin: string,
    githubToken: string
  ): Promise<{ containerId: string; url: string }>;
  stopContainer(containerId: string): Promise<void>;
}
