import { iHttpServer } from "../../interface/http/i-http-server";
import { ISystemHealthService } from "../../application/interfaces/i-system-health-service";
import { HealthRoutes } from "../../interface/routes/health-routes";
import { Container } from "../di/container";
import { TYPES } from "../di/types";
import { SystemHealthService } from "../system-health-service";

export const registerRoutes = (server: iHttpServer) => {
  const container = new Container();

  container.bind(TYPES.ISystemHealthService, SystemHealthService);

  const systemHealthService = container.get<ISystemHealthService>(
    TYPES.ISystemHealthService
  );

  HealthRoutes(server, systemHealthService);
};
