import express from 'express';
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('ACOL Webhook Online - Klydo');
});

app.get('/webhook', (req: any, res: any) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === 'acol_crm_2026') {
    console.log('✅ Webhook verificado');
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

app.post('/webhook', (req: any, res: any) => {
  try {
    const value = req.body.entry?.[0]?.changes?.[0]?.value;
    if (value?.messages && value.messages[0]) {
      const msg = value.messages[0];
      console.log(`📩 MENSAJE META: ${msg.text?.body || 'media'} de ${msg.from}`);
      console.log(JSON.stringify(req.body, null, 2));
    }
    res.sendStatus(200);
  } catch (e) {
    console.log('Error webhook', e);
    res.sendStatus(200);
  }
});

export default app;
