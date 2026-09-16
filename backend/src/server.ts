import gracefulShutdown from "http-graceful-shutdown";
import app from "./app";
import { logger } from "./utils/logger";

const server = app.listen(process.env.PORT || 8080, () => {
  logger.info(`Server started on port: ${process.env.PORT || 8080}`);
});

gracefulShutdown(server);
