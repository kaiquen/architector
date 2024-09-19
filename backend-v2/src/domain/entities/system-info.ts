export type IProps = {
    cpu: string,
    memory: string,
    os: string,
}

export class SystemInfo {
    private constructor(private props: IProps) {}

    public static create(cpu: string, memory: string, os: string): SystemInfo {
        return new SystemInfo({
            cpu,
            memory,
            os,
        });
    }

    public static with(props:   IProps): SystemInfo {
        return new SystemInfo(props);
    }

    public get cpu(): string {
        return this.props.cpu;
    }
    
    public get memory(): string {
        return this.props.memory;
    }
    
    public get os(): string {
        return this.props.os;
    }
}