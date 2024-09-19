import { SystemInfo } from "../../../domain/entities/system-info";
import { ISystemInfoService } from "../../interfaces/i-system-info-service";
import { IGetSystemInfoUseCase, IGetSystemInfoUseCaseResult } from "./interfaces/i-get-system-info-use-case";

export class GetSystemInfoUseCase implements IGetSystemInfoUseCase {
    constructor(
        private readonly systemInfoService: ISystemInfoService
    ){}
    async execute(): Promise<IGetSystemInfoUseCaseResult> {
        const cpu = await this.systemInfoService.getCpuInfo().catch(() => "N/A");
        const memory = await this.systemInfoService.getMemoryInfo().catch(() => "N/A");
        const os = await this.systemInfoService.getOsInfo().catch(() => "N/A");
        
        const systemInfo = SystemInfo.create(cpu, memory, os);
        
        return { 
            cpu: systemInfo.cpu,
            memory: systemInfo.memory,
            os: systemInfo.os
        }
    }
    
}