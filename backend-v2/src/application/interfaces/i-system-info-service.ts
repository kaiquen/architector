export interface ISystemInfoService {
    getCpuInfo(): Promise<string>;
    getMemoryInfo(): Promise<string>;
    getOsInfo(): Promise<string>;
}