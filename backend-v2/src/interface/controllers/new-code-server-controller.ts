import { IValidator } from "../../application/interfaces/i-validator";
import {
  INewCodeServerUseCase,
  INewCodeServerUseCaseParams,
} from "../../application/use-cases/code-server/interfaces/i-new-code-server-use-case";
import { IHttpRequest, IHttpResponse } from "../../infra/i-server";
import { IController } from "./i-controller";

export class NewCodeServerController implements IController {
  constructor(
    private readonly useCase: INewCodeServerUseCase,
    private readonly validator: IValidator<INewCodeServerUseCaseParams>
  ) {}
  async handle(request: IHttpRequest, response: IHttpResponse): Promise<void> {
    const params = request.body as INewCodeServerUseCaseParams;

    await this.validator.validate(params);

    const result = await this.useCase.execute(params);

    response.status(201).json(result);
  }
}
