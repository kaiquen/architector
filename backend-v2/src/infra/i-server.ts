import { IController } from "../interface/controllers/i-controller";

export interface IServer {
  init(port: number): void;
  route(method: IHttpMethod, path: string, controller: IController): void;  
}

export type IHttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";

export interface IHttpRequest {
  body?: object,
  query?: object,
  params?: object,
  headers: object

  method: string;
  url: string;

  getHeader(name: string): string | undefined;
}

export interface IHttpResponse {
  status(code: number): IHttpResponse;
  json(data?: object): void;
  setHeader(name: string, value: string): void; 
  end(): void;
}

