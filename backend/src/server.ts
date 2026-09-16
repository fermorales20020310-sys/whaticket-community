import app from "./app";
import { initIO } from "./libs/socket";
import { logger } from "./utils/logger";
import { StartAllWhatsAppsSessions } from "./services/WbotServices/StartAllWhatsAppsSessions";
import { StartWhatsAppSession } from "./services/WbotServices/StartWhatsAppSession";

const server = app.listen(process.env.PORT || 3000, () => {
  logger.info(`Server started on port: ${process.env.PORT || 3000}`);
});

// WEBHOOK OFICIAL META - NO BORRAR
app.get('/webhook', (req: any, res: any) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
    console.log('WEBHOOK VERIFICADO OK');
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

app.post('/webhook', (req: any, res: any) => {
  console.log('MENSAJE META:', JSON.stringify(req.body, null, 2));
  return res.sendStatus(200);
});

initIO(server);
StartAllWhatsAppsSessions();

process.on("uncaughtException", err => {
  logger.error(err);
});

process.on("unhandledRejection", err => {
  logger.error(err);
});
