import axios, { AxiosInstance } from "axios";
import { IHttpClient } from "../../application/interfaces/i-http-client";

export class AxiosHttpClient implements IHttpClient {
    private readonly axiosInstance: AxiosInstance;

    constructor(){
        this.axiosInstance = axios.create({
            baseURL:"https://"
        })
    }

    async get<TResponse>(url: string, params?: Record<string, unknown>): Promise<TResponse> {
        const response = await this.axiosInstance.get<TResponse>(url, {params});
        return response.data;
    }

    async post<TResponse, TRequest>(url: string, data: TRequest): Promise<TResponse> {
        const response = await this.axiosInstance.post<TResponse>(url, {data});
        return response.data;
    }
}