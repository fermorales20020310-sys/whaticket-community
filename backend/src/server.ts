import app from "./app";
import { initIO } from "./libs/socket";
import { logger } from "./utils/logger";
import { HandleMetaMessage } from "./services/WbotServices/HandleMetaMessage";

const server = app.listen(process.env.PORT || 3000, () => {
  logger.info(`Server started on port: ${process.env.PORT || 3000}`);
});

// WEBHOOK OFICIAL META - CLOUD API - KLIDO AVANZA AZUL
app.get('/webhook', (req: any, res: any) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
    console.log('WEBHOOK VERIFICADO OK - KLIDO AVANZA AZUL');
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

app.post('/webhook', async (req: any, res: any) => {
  try {
    const body = req.body;
    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.field === 'messages') {
            await HandleMetaMessage(change.value);
          }
        }
      }
    }
    return res.sendStatus(200);
  } catch (err) {
    logger.error(err);
    return res.sendStatus(200);
  }
});

initIO(server);

process.on("uncaughtException", err => {
  logger.error(err);
});

process.on("unhandledRejection", err => {
  logger.error(err);
});
