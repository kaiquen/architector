import { IFileSystem } from "../../application/interfaces/i-file-system";

import { CreateProjectControllerFactory } from "../factories/project/create-project-controller-factory";
import { iHttpServer } from "../http/i-http-server";

export const projectRoutes = (server: iHttpServer, fileSystem: IFileSystem) => {
  const createProjectControllerFactory =
    CreateProjectControllerFactory.create(fileSystem);

  server.on("post", "/projects", (req, res) =>
    createProjectControllerFactory.handler(req, res)
  );
};

// const TEMPLATE_DIR = path.join(
//   __dirname,
//   "../../../templates/clean-architecture"
// );

// const createProject = async (projectName: string, targetDir: string) => {
//   try {
//     await fs.copy(TEMPLATE_DIR, targetDir);

//     console.log(`Project ${projectName} created successfully at ${targetDir}`);
//   } catch (error) {
//     throw new Error(`CREATING_PROJECT_ERROR: ${error}`);
//   }
// };

// const generateProject = async (req: Request, res: Response) => {
//   const { projectName, github } = req.body;

//   const projectPath = path.join(__dirname, `../../../tmp/${projectName}`);

//   try {
//     await createProject(projectName, projectPath);

//     if (github) {
//       await addProjectToGithub(projectName, projectPath);

//       return res
//         .status(200)
//         .json({ message: "Project generated and pushed to GitHub" });
//     } else {
//       const zipPath = path.join(__dirname, `../../../tmp/${projectName}.zip`);
//       await zipDirectory(projectPath, zipPath);

//       const zipStream = fs.createReadStream(zipPath);

//       zipStream.pipe(res);

//       zipStream.on("end", () => {
//         fs.removeSync(projectPath);
//         fs.removeSync(zipPath);
//       });

//       zipStream.on("error", (err) => {
//         console.error("Error streaming zip file:", err);
//         res.status(500).json({ message: "Error creating zip file" });
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: "Server error" });
//   }
// };
