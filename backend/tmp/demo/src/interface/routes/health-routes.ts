import { iHttpServer } from "../http/i-http-server";
import { ISystemHealthService } from "../../application/interfaces/i-system-health-service";
import { CheckSystemHealthControllerFactory } from "../factories/health/check-system-health-controller-factory";

export const HealthRoutes = (
  server: iHttpServer,
  systemHealthService: ISystemHealthService
) => {
  const checkSystemHealthController =
    CheckSystemHealthControllerFactory.create(systemHealthService);

  server.on("get", "/health", (req, res) =>
    checkSystemHealthController.handler(req, res)
  );
};
