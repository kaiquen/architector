import Docker from "dockerode";
import { schedule } from "node-cron";

import Redis from 'ioredis';


const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const INACTIVITY_THRESHOLD = 10 * 60  * 1000; 

const pruneInactiveContainers = async () => {
  try {
    console.log("Verificando containers inativos...");

    const containers = await docker.listContainers({ all: true });

    const currentTime = Date.now();

    containers.forEach(async (containerInfo) => {
      const containerId = containerInfo.Id;

      if (containerInfo.Image.includes("code-server-custom")) {
        let lastPing = await redis.get(containerId);


        if (!lastPing) {
          console.log(`Definido lastPing para o container ${containerInfo.Names[0]} como ${currentTime}`);
          lastPing = currentTime.toString();
          await redis.set(containerId, lastPing);
        }

        const container = docker.getContainer(containerId);

        if (currentTime - parseInt(lastPing) > INACTIVITY_THRESHOLD) {
          if (containerInfo.State !== "exited" && containerInfo.State !== "dead") {
            console.log(`Encerrando container ${containerInfo.Names[0]}...`);
            await container.stop();
          }
          await container.remove();
          console.log(`Container ${containerInfo.Names[0]} encerrado e removido.`);
          await redis.del(containerId);
        }
      }
    });
  } catch (error) {
    console.error("Erro ao encerrar containers:", error);
  }
};

schedule("*/1 * * * *", pruneInactiveContainers);
console.log("Cron job para encerrar containers inativos iniciado...");

