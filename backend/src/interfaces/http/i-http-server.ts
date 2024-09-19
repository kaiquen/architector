import { IHttpRequest } from "./i-http-request";
import { IHttpResponse } from "./i-http-response";

export interface iHttpServer {
  on(
    method: string,
    url: string,
    callback: (req: IHttpRequest, res: IHttpResponse) => void
  ): void;

  listen(port: number, callback: () => void): void;
}
