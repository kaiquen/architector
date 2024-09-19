import axios from "axios";
import { IContainerService } from "../../application/interfaces/i-container-service";
import Docker from "dockerode";

export class DockerContainerService implements IContainerService {
  private docker;

  constructor() {
    this.docker = new Docker();
  }

  async startContainer(
    repoUrl: string,
    githubLogin: string,
    githubToken: string
  ): Promise<{ containerId: string; url: string }> {
    const containers = await this.docker.listContainers({ all: true });
    const repoName =
      repoUrl
        .split("/")
        .pop()
        ?.replace(/[^a-zA-Z0-9]/g, "-") ?? "unknown-repo";
    const containerName = `code-server-${githubLogin}-${repoName}`;
    const host = containerName;
    const existingContainer = containers.find((container) =>
      container.Names.includes(`/${containerName}`)
    );

    console.log(existingContainer);

    if (existingContainer) {
      const container = this.docker.getContainer(existingContainer.Id);

      if (existingContainer.State === "running") {
        const data = await container.inspect();
        const hostPort = data.NetworkSettings.Ports["8080/tcp"][0].HostPort;

        await this.waitForServerReady(host, Number(hostPort));

        return {
          containerId: existingContainer.Id,
          url: `http://localhost:${hostPort}`,
        };
      } else {
        await container.start();

        const data = await container.inspect();
        const hostPort = data.NetworkSettings.Ports["8080/tcp"][0].HostPort;

        await this.waitForServerReady(host, Number(hostPort));

        return {
          containerId: existingContainer.Id,
          url: `http://localhost:${hostPort}`,
        };
      }
    }

    const container = await this.docker.createContainer({
      Image: "code-server-custom",
      name: containerName,
      ExposedPorts: {
        "8080/tcp": {},
      },
      HostConfig: {
        Privileged: true,
        PublishAllPorts: true,
        NetworkMode: "monolito_app-network",
      },

      Env: [`GITHUB_TOKEN=${githubToken}`, `REPO_URL=${repoUrl}`],
    });

    await container.start();

    const data = await container.inspect();

    const hostPort = data.NetworkSettings.Ports["8080/tcp"][0].HostPort;

    await this.waitForServerReady(host, Number(hostPort));

    console.log(host, hostPort);

    return { containerId: container.id, url: `http://${host}:8080` };
  }
  async stopContainer(containerId: string): Promise<void> {
    const container = this.docker.getContainer(containerId);

    await container.stop();
    await container.remove();
  }

  private async waitForServerReady(
    host: string,
    port: number,
    retries = 10,
    interval = 2000
  ): Promise<void> {
    for (let i = 0; i < retries; i++) {
      const isReady = await this.isServerResponding(host, port);
      if (isReady) {
        console.log(`Servidor pronto na porta ${port}`);
        return;
      }
      console.log(`Esperando o servidor iniciar na porta ${port}...`);
      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    throw new Error(
      `O servidor não ficou pronto na porta ${port} após ${retries} tentativas.`
    );
  }

  private async isServerResponding(
    host: string,
    port: number
  ): Promise<boolean> {
    // SE ROTA NO CONTAINER A PORTA DEVE SER 8080, SE FOR LOCAL DEVE SER O PORT
    try {
      const response = await axios.get(`http://${host}:8080`);
      return response.status === 200;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
