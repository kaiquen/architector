type CustomErrorType = {
  code: number;
  message: string;

  parameter: string;
  type: string;
};

export class CustomError extends Error {
  code: number;
  details: {
    message: string;
    parameter: string;
    type: string;
  };

  constructor(params: CustomErrorType) {
    super(params.message);
    this.name = "CustomError";

    this.details = {
      message: params.message,
      parameter: params.parameter,
      type: params.type,
    };

    this.code = params.code;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}
