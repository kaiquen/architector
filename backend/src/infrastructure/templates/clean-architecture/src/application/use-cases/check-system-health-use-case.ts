import { System } from "../../domain/entities/system";
import { ISystemHealthService } from "../interfaces/i-system-health-service";

export namespace ICheckSystemHealthUseCase {
  export type Params = { systemName: string };
  export type Result = System;
}
export class CheckSystemHealthUseCase {
  constructor(private readonly systemHealthService: ISystemHealthService) {}

  execute({ systemName }: ICheckSystemHealthUseCase.Params): System {
    return this.systemHealthService.checkHealth(systemName);
  }
}
