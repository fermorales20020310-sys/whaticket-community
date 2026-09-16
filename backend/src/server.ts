import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>ACOL Bogota - Klydo</title>
      <style>
        body{margin:0;background:#000;color:#fff;font-family:Arial;text-align:center;padding:20px}
        img{width:100%;max-width:700px;border-radius:15px;margin:20px 0}
        .badge{background:#25D366;color:#fff;padding:8px 16px;border-radius:20px;display:inline-block;margin:5px}
        .btn{background:#25D366;color:#fff;padding:18px 35px;border-radius:30px;text-decoration:none;font-weight:bold;font-size:19px;display:inline-block;margin:20px}
      </style>
    </head>
    <body>
      <h1>ACOL - Bogotá</h1>
      <div><span class="badge">ACOL Webhook Online - Klydo</span> <span class="badge">ID: acolbogota</span></div>
     <img src="https://i.ibb.co/nqYGp3sn/Whats-App-Image-2026-09-15-at-3-37-22-PM-2.jpg" alt="ACOL Bogota" />
      <br>
      <a class="btn" href="https://wa.me/573001234567?text=Hola%20ACOL%20Bogota">💬 Hablar por WhatsApp</a>
      <p style="color:#888">stellar-possibility-production-f191.up.railway.app</p>
    </body>
    </html>
  `);
});

app.listen(PORT, () => console.log("ACOL Running on "+PORT));
