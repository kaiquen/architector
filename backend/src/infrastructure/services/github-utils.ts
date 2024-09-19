import simpleGit from "simple-git";

export const addProjectToGithub = async (
  projectName: string,
  projectPath: string
) => {
  const GITHUB_API_URL = process.env.GITHUB_API_URL;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

  try {
    const createRepoResponse = await fetch(`${GITHUB_API_URL}/user/repos`, {
      method: "POST",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: projectName,
        private: false,
      }),
    });

    const repoData = await createRepoResponse.json();

    const repoUrl = repoData.clone_url.replace(
      "https://",
      `https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@`
    );

    const git = simpleGit(projectPath);

    await git.init();
    await git.addRemote("origin", repoUrl);
    await git.add(".");
    await git.commit("Initial commit");
    await git.push("origin", "master");

    console.log(`Project ${projectName} pushed to GitHub successfully`);
  } catch (error) {
    throw new Error(`PUSHING_PROJECT_IN_GITHUB: ${error}`);
  }
};
