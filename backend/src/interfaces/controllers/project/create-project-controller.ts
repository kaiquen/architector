
import { ICreateProjectUseCase } from "../../../application/use-case/project/interfaces/i-create-project-use-case";
import { IHttpRequest } from "../../http/i-http-request";
import { IHttpResponse } from "../../http/i-http-response";

export class CreateProjectController {
  constructor(private readonly useCase: ICreateProjectUseCase) {}

  async handler(req: IHttpRequest, res: IHttpResponse) {
    const params: ICreateProjectUseCase.Params = req.body;

    const { zipFilePath, structure, cleanup } = await this.useCase.execute(params);

    res.json(structure);
    // res.download(zipFilePath);

    await cleanup();
  }
}
