import { BadRequestError } from "./bad-request-error";

export class ValidationErrors extends Error {
  constructor(public errors: BadRequestError[]) {
    super();
    this.name = "ValidationsErrors";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationErrors);
    }
  }
}
