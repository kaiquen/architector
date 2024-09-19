import { Project } from "../../../../domain/entities/project";
import { LanguageType } from "../../../../domain/enums/language-type";
import { PackageManagerType } from "../../../../domain/enums/package-manager-type";

export interface ICreateProjectUseCase {
    execute(params: ICreateProjectUseCase.Params): Promise<ICreateProjectUseCase.Result>
}

export namespace ICreateProjectUseCase {
    export type Params = { 
        packageManager: PackageManagerType,
        language: LanguageType
        metadata: {
            name: string; 
            description: string; 
            author: string
        }
    };
    export type Result = {
        zipFilePath: string;
        structure: any;
        cleanup: () => Promise<void>;
    };
}