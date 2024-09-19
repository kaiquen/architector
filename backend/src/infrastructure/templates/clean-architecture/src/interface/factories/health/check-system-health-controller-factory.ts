import { ISystemHealthService } from "../../../application/interfaces/i-system-health-service";
import { CheckSystemHealthUseCase } from "../../../application/use-cases/check-system-health-use-case";
import { CheckSystemHealthController } from "../../controllers/check-system-health-controller";

export class CheckSystemHealthControllerFactory {
  static create(
    systemHealthService: ISystemHealthService
  ): CheckSystemHealthController {
    const checkSystemHealthUseCase = new CheckSystemHealthUseCase(
      systemHealthService
    );
    return new CheckSystemHealthController(checkSystemHealthUseCase);
  }
}
