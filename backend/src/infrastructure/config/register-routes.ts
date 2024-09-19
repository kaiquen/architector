import { IFileSystem } from "../../application/interfaces/i-file-system";
import { iHttpServer } from "../../interfaces/http/i-http-server";
import { projectRoutes } from "../../interfaces/routes/project-routes";
import { Container } from "../di/container";
import { TYPES } from "../di/types";
import { NodeFileSystem } from "../fs/node-file-system";

export const registerRoutes = (server: iHttpServer) => {
  const container = new Container();

  container.bind(TYPES.IFileSystem, NodeFileSystem);
  container.bind(TYPES.SomeOtherFileSystem, NodeFileSystem);

  const fileSystemForProject = container.get<IFileSystem>(TYPES.IFileSystem);

  projectRoutes(server, fileSystemForProject);
};
