import { NewCodeServerUseCase } from "./application/use-cases/code-server/new-code-server-use-case";
import { GetSystemInfoUseCase } from "./application/use-cases/system-info/get-system-info-use-case";
import { ExpressServer } from "./infra/servers/express-server";
import { DockerContainerService } from "./infra/services/docker-container-service";
import { NodeSystemInfoService } from "./infra/services/node-system-info-service";
import { JoiValidator } from "./infra/validators/joi-validator";
import { NewCreateServerSchema } from "./infra/validators/schemas/new-create-server-schema";
import { GetSystemInfoController } from "./interface/controllers/get-system-info-controller";
import { NewCodeServerController } from "./interface/controllers/new-code-server-controller";

const server = ExpressServer.create();

const modeSystemInfoService = new NodeSystemInfoService();
const getSystemInfoUseCase = new GetSystemInfoUseCase(modeSystemInfoService);

server.route(
  "GET",
  "/system-info",
  new GetSystemInfoController(getSystemInfoUseCase)
);

const dockerContainerService = new DockerContainerService();
const newCodeServerUseCase = new NewCodeServerUseCase(dockerContainerService);
const joiValidator = new JoiValidator(NewCreateServerSchema);

server.route(
  "POST",
  "/code-server",
  new NewCodeServerController(newCodeServerUseCase, joiValidator)
);

server.init(3001);
