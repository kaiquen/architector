import { ISystemHealthService } from "../application/interfaces/i-system-health-service";
import { System } from "../domain/entities/system";

export class SystemHealthService implements ISystemHealthService {
  checkHealth(systemName: string): System {
    // Simulação de uma verificação de saúde (em um caso real, poderia ser uma chamada HTTP, consulta ao banco de dados, etc.)

    const isHealthy = Math.random() > 0.2; // 80% de chande de estar saudável

    const status = isHealthy ? "Healthy" : "Unhealthy";

    return new System(systemName, status);
  }
}
