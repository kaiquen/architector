import { IUseCase } from "../../i-use-case"

export type IGetSystemInfoUseCaseResult = {
    cpu: string,
    memory: string,
    os: string
}

export type IGetSystemInfoUseCase = IUseCase<void, IGetSystemInfoUseCaseResult>
