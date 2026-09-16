import "./bootstrap";
import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as Sentry from "@sentry/node";

import "./database";
import uploadConfig from "./config/upload";
import AppError from "./errors/AppError";
import routes from "./routes";
import { logger } from "./utils/logger";

Sentry.init({ dsn: process.env.SENTRY_DSN });

const app = express();
// --- ACOL WEBHOOK META ---
app.get("/webhook", (req: any, res: any) => {
  if (req.query["hub.verify_token"] === "acol_crm_2026") {
    return res.send(req.query["hub.challenge"]);
  }
  return res.sendStatus(403);
});
app.post("/webhook", (req: any, res: any) => {
  console.log("📩 MENSAJE META:", JSON.stringify(req.body, null, 2));
  return res.sendStatus(200);
});
// --- FIN ACOL ---
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(Sentry.Handlers.requestHandler());
app.use("/public", express.static(uploadConfig.directory));
app.use(routes);

app.use(Sentry.Handlers.errorHandler());

app.use(async (err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    logger.warn(err);
    return res.status(err.statusCode).json({ error: err.message });
  }

  logger.error(err);
  return res.status(500).json({ error: "Internal server error" });
});

export default app;
