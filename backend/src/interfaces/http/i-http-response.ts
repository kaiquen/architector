export interface IHttpResponse {
  status(code: number): IHttpResponse;
  json(data: Object): void;
  download(url: string): void;
}
