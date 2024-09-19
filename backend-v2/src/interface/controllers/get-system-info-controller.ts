import { IGetSystemInfoUseCase } from "../../application/use-cases/system-info/interfaces/i-get-system-info-use-case";
import { IHttpRequest, IHttpResponse } from "../../infra/i-server";
import { IController } from "./i-controller";

export class GetSystemInfoController implements IController {
    constructor(private readonly useCase: IGetSystemInfoUseCase){}
    async handle(request: IHttpRequest, response: IHttpResponse): Promise<void> {
        const result = await this.useCase.execute();

        response.status(200).json(result);
    }
}