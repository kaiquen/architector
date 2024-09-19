import express, { Express, NextFunction, Request, Response } from "express";
import { IHttpMethod, IHttpRequest, IHttpResponse, IServer } from "../i-server";
import { IController } from "../../interface/controllers/i-controller";

import cors from "cors";
import { ValidationErrors } from "../../application/errors/validation-errors";
import { CustomError } from "../../application/errors/custom-error";

export class ExpressServer implements IServer {
  private app: Express;

  private constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  public static create() {
    return new ExpressServer();
  }
  public route(
    method: IHttpMethod,
    path: string,
    controller: IController
  ): void {
    const handler = async (req: Request, res: Response, next: NextFunction) => {
      try {
        await controller.handle(
          this.toIHttpRequest(req),
          this.toIHttpResponse(res)
        );
      } catch (error) {
        next(error);
      }
    };

    switch (method) {
      case "GET":
        this.app.get(path, handler);
        break;
      case "POST":
        this.app.post(path, handler);
        break;
      case "PUT":
        this.app.put(path, handler);
        break;
      case "DELETE":
        this.app.delete(path, handler);
        break;
      case "PATCH":
        this.app.patch(path, handler);
        break;
      case "OPTIONS":
        this.app.options(path, handler);
        break;
      case "HEAD":
        this.app.head(path, handler);
        break;
      default:
        throw new Error(`Method ${method} is not supported`);
    }
  }

  public init(port: number): void {
    this.errorHandler();

    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }

  private errorHandler() {
    this.app.use(
      (
        error: Error,
        request: Request,
        response: Response,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: NextFunction
      ): Response => {
        console.log(error);

        if (error instanceof ValidationErrors) {
          return response.status(400).json({
            code: 400,
            error: {
              errors: error.errors.map((err) => err.details),
              message: error.errors.map((err) => err.message).join(";"),
            },
          });
        }
        if (error instanceof CustomError) {
          return response.status(error.code).json({
            code: error.code,
            error: {
              errors: [error.details],
              message: error.message,
            },
          });
        }

        return response.status(500).json({ message: "Server error" });
      }
    );
  }

  private toIHttpRequest(req: Request): IHttpRequest {
    return {
      body: req.body,
      query: req.query,
      params: req.params,
      headers: req.headers,
      method: req.method,
      url: req.url,
      getHeader: (name: string) => req.get(name),
    };
  }

  private toIHttpResponse(res: Response): IHttpResponse {
    return {
      status: (code: number) => {
        res.status(code);
        return this.toIHttpResponse(res);
      },
      json: (data: object) => {
        res.json(data);
      },
      setHeader: (name: string, value: string) => {
        res.setHeader(name, value);
      },
      end: () => {
        res.end();
      },
    };
  }
}
