import { Router } from "express";
const routes = Router();

routes.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"] as string;
  const token = req.query["hub.verify_token"] as string;
  const challenge = req.query["hub.challenge"] as string;
  const VERIFY = process.env.VERIFY_TOKEN || "klido123";

  if (mode === "subscribe" && token === VERIFY) {
    console.log("KLIDO WEBHOOK VERIFICADO");
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

routes.post("/webhook", (req, res) => {
  console.log("KLIDO MSG:", JSON.stringify(req.body, null, 2));
  return res.status(200).send("EVENT_RECEIVED");
});

export default routes;
