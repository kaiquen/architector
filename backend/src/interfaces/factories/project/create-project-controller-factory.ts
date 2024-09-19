import { IFileSystem } from "../../../application/interfaces/i-file-system";
import { CreateProjectUseCase } from "../../../application/use-case/project/create-project-use-case";
import { CreateProjectController } from "../../controllers/project/create-project-controller";

export class CreateProjectControllerFactory {
  static create(fileSystem: IFileSystem): CreateProjectController {
    const createProjectUseCase = new CreateProjectUseCase(fileSystem);
    
    return new CreateProjectController(createProjectUseCase);
  }
}
