import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
const IMAGE_URL = "https://i.ibb.co/nqYGp3sn/Whats-App-Image-2026-09-15-at-3-37-22-PM-2.jpg";

app.get("/", (req, res) => {
  res.send(`
    <html>
    <head><meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
      body{margin:0;background:#0a0a0a;color:white;font-family:Arial;text-align:center}
      img{width:100%;max-width:700px;margin-top:20px;border-radius:12px}
      h1{margin:20px 0 10px} .tag{background:#25D366;padding:10px 20px;border-radius:20px;display:inline-block;margin:10px}
      .btn{display:inline-block;margin:20px;padding:16px 32px;background:#25D366;color:#fff;text-decoration:none;border-radius:30px;font-weight:bold;font-size:18px}
    </style></head>
    <body>
      <h1>ACOL - Bogotá</h1>
      <span class="tag">ACOL Webhook Online - Klydo</span>
      <span class="tag">ID: acolbogota</span>
      <div><img src="${IMAGE_URL}" /></div>
      <a class="btn" href="https://wa.me/573001234567">Hablar por WhatsApp</a>
      <p style="color:#888;margin:30px">stellar-possibility-production-f191.up.railway.app</p>
    </body></html>
  `);
});

app.listen(PORT, () => console.log("ACOL Bogota Online on "+PORT));
