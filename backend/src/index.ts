import { registerRoutes } from "./infrastructure/config/register-routes";
import { ExpressAdapter } from "./infrastructure/http/express-adapter";

const PORT = Number(process.env.PORT || 3001);

const server = new ExpressAdapter();

registerRoutes(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
