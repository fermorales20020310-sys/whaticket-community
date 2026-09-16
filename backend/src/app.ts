import gracefulShutdown from "http-graceful-shutdown";
import app from "./app";
import { initIO } from "./libs/socket";
import { logger } from "./utils/logger";
import { initRedis } from "./libs/redisStore";

const server = app.listen(process.env.PORT || 8080, () => {
  logger.info(`Server started on port: ${process.env.PORT || 8080}`);
});

initIO(server);
initRedis();

gracefulShutdown(server);
