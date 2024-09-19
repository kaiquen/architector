import os from "node:os";
import { ISystemInfoService } from "../../application/interfaces/i-system-info-service";

export class NodeSystemInfoService implements ISystemInfoService {
   async getCpuInfo(): Promise<string> {
      const cpus = os.cpus();
      return JSON.stringify(cpus);
   }
   async getMemoryInfo(): Promise<string> {
      const totalMemory = os.totalmem();
      const freeMemory = os.freemem();
      return `Total: ${totalMemory}, Free: ${freeMemory}`
   }
   async getOsInfo(): Promise<string> {
      const platform = os.platform();
      const release = os.release();
      return `Platform: ${platform}, Release: ${release}`
   }
}