import Docker from "dockerode";
import cron from "node-cron";

const docker = new Docker({ socketPath: "/var/run/docker.sock" });
let lastPingTime: { [containerId: string]: Date } = {};

// Função para encerrar containers inativos
const pruneInactiveContainers = async () => {
  try {
    console.log("Verificando containers inativos...");
    const containers = await docker.listContainers({ all: true });

    const currentTime = new Date();

    for (const containerInfo of containers) {
      const container = docker.getContainer(containerInfo.Id);
      const lastPing = lastPingTime[containerInfo.Id];

      if (lastPing) {
        const timeDiff =
          (currentTime.getTime() - lastPing.getTime()) / 1000 / 60; // Diferença em minutos

        // Se o container estiver inativo por mais de 5 minutos
        if (timeDiff > 5) {
          console.log(
            `Encerrando container ${containerInfo.Names[0]} por inatividade.`
          );
          await container.stop();
          await container.remove();
          delete lastPingTime[containerInfo.Id]; // Remove o container do registro de pings
        }
      }
    }
  } catch (error) {
    console.error("Erro ao encerrar containers:", error);
  }
};

// Agendar verificação a cada minuto
cron.schedule("*/1 * * * *", pruneInactiveContainers);
console.log("Cron job para encerrar containers inativos iniciado...");
