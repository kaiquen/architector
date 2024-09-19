import { IContainerService } from "../../interfaces/i-container-service";
import {
  INewCodeServerUseCase,
  INewCodeServerUseCaseParams,
  INewCodeServerUseCaseResult,
} from "./interfaces/i-new-code-server-use-case";

export class NewCodeServerUseCase implements INewCodeServerUseCase {
  constructor(private readonly containerService: IContainerService) {}
  async execute(
    params: INewCodeServerUseCaseParams
  ): Promise<INewCodeServerUseCaseResult> {
    const { url } = await this.containerService.startContainer(
      params.repoUrl,
      params.githubLogin,
      params.githubToken
    );

    return { url };
  }
}
