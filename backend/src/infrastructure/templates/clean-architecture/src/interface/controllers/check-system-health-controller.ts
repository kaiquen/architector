import { IHttpRequest } from "../http/i-http-request";
import { IHttpResponse } from "../http/i-http-response";
import {
  CheckSystemHealthUseCase,
  ICheckSystemHealthUseCase,
} from "../../application/use-cases/check-system-health-use-case";

export class CheckSystemHealthController {
  constructor(
    private readonly checkSystemHealthUseCase: CheckSystemHealthUseCase
  ) {}

  handler(req: IHttpRequest, res: IHttpResponse): void {
    const { systemName }: ICheckSystemHealthUseCase.Params = req.query;

    if (!systemName) {
      res.status(404).json({ message: "System name is required." });
      return;
    }

    const systemHealth = this.checkSystemHealthUseCase.execute({ systemName });

    res.status(200).json(systemHealth);
  }
}
