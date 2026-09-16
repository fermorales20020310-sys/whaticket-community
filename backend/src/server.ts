import express from "express";
const app = express();
app.use(express.json());

app.get("/webhook", (req, res) => {
  if (req.query["hub.verify_token"] === "acol_crm_2026") {
    return res.send(req.query["hub.challenge"]);
  }
  return res.sendStatus(403);
});

app.post("/webhook", (req, res) => {
  console.log("📩 MENSAJE META LLEGO:", JSON.stringify(req.body, null, 2));

  const entry = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (entry) {
    console.log(`📩 MENSAJE META REAL de ${entry.from}: ${entry.text?.body}`);
  }
  res.sendStatus(200);
});

app.get("/", (req, res) => res.send("ACOL CRM Online - Oficial"));
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started on port: ${port}`));
