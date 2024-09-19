import Joi from "joi";
import { INewCodeServerUseCaseParams } from "../../../application/use-cases/code-server/interfaces/i-new-code-server-use-case";

export const NewCreateServerSchema = Joi.object<INewCodeServerUseCaseParams>({
  githubLogin: Joi.string()
    .required()
    .messages({ "any.required": "githubLogin is required" }),
  githubToken: Joi.string()
    .required()
    .messages({ "any.required": "githubToken is required" }),
  repoUrl: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .regex(/^https:\/\/github\.com\/.+\/.+$/)
    .required()
    .messages({
      "string.uri": "repoUrl must be a valid URL",
      "string.pattern.base":
        "repoUrl must be a valid GitHub repository URL (e.g., https://github.com/owner/repo)",
      "any.required": "repoUrl is required",
    }),
}).unknown(true);
