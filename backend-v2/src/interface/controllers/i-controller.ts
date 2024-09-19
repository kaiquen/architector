import { IHttpRequest, IHttpResponse } from "../../infra/i-server";

export interface IController {
    handle(request: IHttpRequest, response: IHttpResponse): Promise<void>;
}