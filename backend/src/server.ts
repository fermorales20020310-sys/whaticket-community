import gracefulShutdown from "http-graceful-shutdown";
import app from "./app";
import { initIO } from "./libs/socket";
import { logger } from "./utils/logger";
import { initRedis } from "./libs/redisStore";
// import { StartAllWhatsAppsSessions } from "./services/WbotServices/StartAllWhatsAppsSessions"; // Comenta esta línea

const server = app.listen(process.env.PORT, () => {
  logger.info(`Server started on port: ${process.env.PORT}`);
});

initIO(server);
initRedis();
// StartAllWhatsAppsSessions(); // Comenta esta línea para evitar el crash

gracefulShutdown(server);
