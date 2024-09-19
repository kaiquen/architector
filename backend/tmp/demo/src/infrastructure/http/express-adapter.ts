import { Request, Response } from "express";
import { IHttpRequest } from "../../interface/http/i-http-request";
import { IHttpResponse } from "../../interface/http/i-http-response";
import { iHttpServer } from "../../interface/http/i-http-server";

import express from "express";

class ExpressRequestAdapter implements IHttpRequest {
  constructor(private request: Request) {}

  get query() {
    return this.request.query;
  }

  get body() {
    return this.request.body;
  }
}

class ExpressResponseAdapter implements IHttpResponse {
  constructor(private response: Response) {}

  status(code: number): IHttpResponse {
    this.response.status(code);
    return this;
  }

  json(data: Object): void {
    this.response.json(data);
  }
}

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export class ExpressAdapter implements iHttpServer {
  private app = express();

  constructor() {
    this.app.use(express.json());
  }

  on(
    method: HttpMethod,
    url: string,
    callback: (req: IHttpRequest, res: IHttpResponse) => void
  ): void {
    this.app[method](url, (req: Request, res: Response) => {
      callback(new ExpressRequestAdapter(req), new ExpressResponseAdapter(res));
    });
  }

  listen(port: number, callback: () => void): void {
    this.app.listen(port, callback);
  }
}
