import { Schema } from "joi";
import { IValidator } from "../../application/interfaces/i-validator";
import { BadRequestError } from "../../application/errors/bad-request-error";
import { ValidationErrors } from "../../application/errors/validation-errors";

export class JoiValidator<T> implements IValidator<T> {
  constructor(private readonly schema: Schema) {}

  async validate(data: T): Promise<void> {
    const { error } = this.schema.validate(data, { abortEarly: false });

    if (error) {
      const errors: BadRequestError[] = error.details.map(
        (detail) =>
          new BadRequestError({
            message: detail.message,
            parameter: detail.path.join("."),
            type: detail.type,
          })
      );

      throw new ValidationErrors(errors);
    }
  }
}
