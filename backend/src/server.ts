import express from "express";
import pg from "pg";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Crea tablas Klydo
pool.query(`
CREATE TABLE IF NOT EXISTS contacts (
  phone VARCHAR(20) PRIMARY KEY,
  name VARCHAR(255),
  status VARCHAR(20) DEFAULT 'Nuevos',
  last_message TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
)`).then(()=>console.log("✅ DB Klydo lista"));

app.get("/webhook", (req,res)=>{
  if(req.query["hub.verify_token"]==="acol_crm_2026") return res.send(req.query["hub.challenge"]);
  res.sendStatus(403);
});

app.post("/webhook", async (req,res)=>{
  const v = req.body.entry?.[0]?.changes?.[0]?.value;
  const msg = v?.messages?.[0];
  const contact = v?.contacts?.[0];
  if(msg){
    const phone = msg.from;
    const body = msg.text?.body || msg.type;
    const name = contact?.profile?.name || phone;
    await pool.query(`INSERT INTO contacts (phone,name,last_message) VALUES ($1,$2,$3) ON CONFLICT (phone) DO UPDATE SET last_message=$3, updated_at=NOW(), name=$2`, [phone,name,body]);
    console.log(`📩 KLYDO GUARDADO ${phone}: ${body}`);
  }
  res.sendStatus(200);
});

app.get("/api/contacts", async (req,res)=>{
  const {rows} = await pool.query("SELECT * FROM contacts ORDER BY updated_at DESC");
  res.json(rows);
});

app.post("/api/contacts/:phone/status", async (req,res)=>{
  await pool.query("UPDATE contacts SET status=$1 WHERE phone=$2", [req.body.status, req.params.phone]);
  res.json({ok:true});
});

// Frontend Klydo
app.get("/", (req,res)=>res.send(`
<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>KLYDO AVANZA</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-gray-100 flex h-screen">
<div class="w-60 bg-[#0a2a6b] text-white p-4"><div class="font-bold text-2xl">ACOL<br><span class="text-xs">KLYDO AVANZA</span></div><div class="mt-10 bg-white/20 p-2 rounded">Kanban Ventas</div><div class="mt-auto pt-20 text-xs">311 808 1101 Oficial</div></div>
<div class="flex-1"><header class="bg-white p-4 flex justify-between"><h1 class="font-bold text-xl">Kanban - Ventas ACOL</h1><button onclick="load()" class="bg-blue-600 text-white px-4 py-1 rounded-full">Actualizar</button></header><div id="board" class="flex gap-4 p-6 overflow-auto"></div></div>
<script>
const COLS=["Nuevos","En Proceso","HOT","COLD","Cerrados"];
async function load(){const r=await fetch('/api/contacts');const d=await r.json();const b=document.getElementById('board');b.innerHTML="";COLS.forEach(c=>{const f=d.filter(x=>x.status===c||(!x.status&&c==="Nuevos"));const col=document.createElement('div');col.className="min-w-[280px] bg-gray-50 p-2 rounded";col.innerHTML="<b>"+c+" ("+f.length+")</b>";f.forEach(x=>{col.innerHTML+=\`<div class="bg-white p-3 rounded shadow mt-2"><div class="text-xs text-gray-400">\${new Date(x.updated_at).toLocaleTimeString()}</div><div class="font-semibold">\${x.last_message}</div><div class="text-sm">📞 \${x.phone}</div><select onchange="fetch('/api/contacts/'+x.phone+'/status',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({status:this.value})}).then(()=>load())" class="text-xs border w-full mt-2"><option>Mover a...</option>\${COLS.map(o=>"<option>"+o+"</option>").join('')}</select></div>\`});b.appendChild(col);});if(d.length===0)b.innerHTML="<div class='m-auto bg-white p-10 rounded-xl text-center'>📩 Esperando mensajes...<br>Manda WhatsApp al 311 y aparece aqui</div>"}
setInterval(load,3000);load();
</script></body></html>
`));

app.listen(process.env.PORT||8080, ()=>console.log("🚀 KLYDO AVANZA ONLINE"));
