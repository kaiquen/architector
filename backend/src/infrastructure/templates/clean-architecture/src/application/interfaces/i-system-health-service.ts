import { System } from "../../domain/entities/system";

export interface ISystemHealthService {
  checkHealth(systemName: string): System;
}
