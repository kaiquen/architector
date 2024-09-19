
import path from "path";
import { Project } from "../../../domain/entities/project";
import { LanguageType } from "../../../domain/enums/language-type";
import { PackageManagerType } from "../../../domain/enums/package-manager-type";
import { zipDirectory } from "../../../infrastructure/services/zip-utils";
import { IFileSystem } from "../../interfaces/i-file-system";
import { ICreateProjectUseCase } from "./interfaces/i-create-project-use-case";
import { execSync } from 'child_process';
import fs from "fs-extra";
import { timeStamp } from "console";

export class CreateProjectUseCase implements ICreateProjectUseCase{
  constructor(private readonly fileSystem: IFileSystem) {}

  async execute(params: ICreateProjectUseCase.Params): Promise<ICreateProjectUseCase.Result >{
    const project = new Project(params.metadata.name, params.metadata.description, params.metadata.author);

    const projectPath = `${process.cwd()}/tmp/${project.name}`;

    const directories = [
      "src/application/use-cases",
      "src/application/interfaces",
      "src/domain/entities",
      "src/infrastructure/config",
      "src/infrastructure/http",
      "src/interface/controllers",
      "src/interface/routes",
      "src/interface/factories",
      "src/shared/utils",
    ];

    directories.forEach((dir) => {
      this.fileSystem.createDirectory(`${projectPath}/${dir}`);
    });

 
    const templateFiles = [
      "src/app.ts",
      "src/application/interfaces/i-http-request.ts",
      "src/application/interfaces/i-http-response.ts",
      "src/application/interfaces/i-http-server.ts",
      "src/application/interfaces/i-system-health-service.ts",
      "src/application/use-cases/check-system-health-use-case.ts",
      "src/domain/entities/system.ts",
      "src/infrastructure/config/register-routes.ts",
      "src/infrastructure/di/container.ts",
      "src/infrastructure/di/types.ts",
      "src/infrastructure/http/express-adapter.ts",
      "src/infrastructure/system-health-service.ts",
      "src/interface/controllers/check-system-health-controller.ts",
      "src/interface/factories/health/check-system-health-controller-factory.ts",
      "src/interface/routes/health-routes.ts",
      "src/interface/http/i-http-request.ts",
      "src/interface/http/i-http-response.ts",
      "src/interface/http/i-http-server.ts",
      "tsconfig.json",
      "package.json"
    ];

    templateFiles.forEach((file) => {
      try {
        const destinationPath = `${projectPath}/${file}`;
        const destinationDir = destinationPath.substring(
          0,
          destinationPath.lastIndexOf("/")
        );

        if (!this.fileSystem.exists(destinationDir)) {
          this.fileSystem.createDirectory(destinationDir);
        }

        const content = this.fileSystem.readFile(
          `src/infrastructure/templates/clean-architecture/${file}`
        );
        this.fileSystem.writeFile(destinationPath, content);
      } catch (error) {
        console.error(`Error processing template file ${file}:`, error);
      }
    });

    const boilerplateFiles = [".eslintrc.json", "tsconfig.json", ".prettierrc"];

    boilerplateFiles.forEach((file) => {
      try {
        const content = this.fileSystem.readFile(
          `src/infrastructure/boilerplate/${file}`
        );
        this.fileSystem.writeFile(`${projectPath}/${file}`, content);
      } catch (error) {
        console.error(`Error processing boilerplate file ${file}:`, error);
      }
    });
    

    const packageJson = {
      name: params.metadata.name,
      description: params.metadata.description,
      author: params.metadata.author,
      version: "1.0.0",
      scripts: {},
      dependencies: {},
      devDependencies: {},
    }

    if(params.language === LanguageType.TYPESCRIPT) {
      
      packageJson.devDependencies = {
        "@types/express": "^4.17.21",
        "nodemon": "^3.1.4",
        "ts-node": "^10.9.2",
        "typescript": "^5.5.4",
      }
      packageJson.scripts = {
        start: "node dist/app.js",
        build: "tsc"
      }
    }

    switch(params.packageManager) {
      case PackageManagerType.PNPM: {
        packageJson.scripts = {
          start: "pnpm node dist/app.js",
          build: "pnpm tsc"
        }

        break;
      }

      case PackageManagerType.YARN: {
        packageJson.scripts = {
          start: "yarn node dist/app.js",
          build: "yarn tsc"
        }

        break;
      }
    }
  
    this.fileSystem.writeFile(
      `${projectPath}/package.json`,
      JSON.stringify(packageJson, null, 2)
    );
    
    this.installDependencies(params.packageManager, projectPath);

    const zipFilePath = `${projectPath}.zip`;
    await zipDirectory(projectPath, zipFilePath);

    const structure = this.getProjectStructure(projectPath);

    return {zipFilePath,structure, cleanup: () => this.cleanup(projectPath, zipFilePath)};
  }

  private installDependencies(packageManager: PackageManagerType, projectPath: string): void {
    const command = this.getInstallCommand(packageManager);
    try {
      console.log(`Installing dependencies using ${packageManager}... in ${projectPath}`);
      execSync(command, { cwd: projectPath, stdio: 'inherit' });
      console.log('Dependencies installed successfully.');
    } catch (error) {
      console.error('Error installing dependencies:', error);
      throw new Error('Failed to install dependencies');
    }
  }

  private getInstallCommand(packageManager: PackageManagerType): string {
    switch (packageManager) {
      case PackageManagerType.PNPM:
        return 'pnpm install';
      case PackageManagerType.YARN:
        return 'yarn install';
      default:
        return 'npm install';
    }
  }

  private async cleanup(projectPath: string, zipFilePath: string): Promise<void> {
    try {
      await fs.remove(projectPath);
      await fs.remove(zipFilePath);
      console.log('Temporary files cleaned up successfully.');
    } catch (error) {
      console.error('Error cleaning up temporary files:', error);
    }
  }

  private getProjectStructure(dirPath: string) {
    const structure:any = {};

    fs.readdirSync(dirPath).forEach(file => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      
      if(file === "node_modules") return;

      if (stats.isDirectory()) {
        structure[file] = this.getProjectStructure(filePath);
      } else {
        structure[file] = 'file';
      }
    });

    return structure;
  }
}
