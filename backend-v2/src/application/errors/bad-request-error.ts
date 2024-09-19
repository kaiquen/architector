import { CustomError } from "./custom-error";

type BadRequestErrorType = {
  message: string;
  parameter: string;
  type: string;
};

export class BadRequestError extends CustomError {
  constructor(params: BadRequestErrorType) {
    super({
      code: 400,
      message: params.message,
      parameter: params.parameter,
      type: params.type,
    });

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError);
    }
  }
}
