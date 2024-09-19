export interface IHttpClient {
    get<TResponse>(url: string, params?: Record<string, unknown>): Promise<TResponse>;
    post<TResponse, TRequest>(url: string, data: TRequest): Promise<TResponse>;
}