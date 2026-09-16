import express from 'express';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let leads:any[]=[];
let contactos:any[]=[];

app.get('/', (req,res)=>{
  res.send(`
    <html><body style="font-family:sans-serif; text-align:center; padding:50px;">
    <h1>KLYDO AVANZA ONLINE ✅</h1>
    <p>Servidor funcionando con plantilla <b>acolbogota</b></p>
    <p>Imagen: https://i.ibb.co/nqYGp3sn/Whats-App-Image-2026-09-15-at-3-37-22-PM-2.jpg</p>
    <hr>
    <p>Para probar campaña, abre la consola (F12) y pega:</p>
    <code>fetch('/api/campaign',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({lista:[{phone:'57311XXXXXXX'}]})})</code>
    <p>Leads guardados: ${leads.length}</p>
    </body></html>
  `);
});

app.get('/webhook',(req,res)=>{
  if(req.query['hub.verify_token']==='acol_crm_2026') res.send(req.query['hub.challenge']);
  else res.sendStatus(403);
});

app.post('/webhook',(req,res)=>{
  const v=req.body.entry?.[0]?.changes?.[0]?.value;
  const m=v?.messages?.[0];
  if(m) leads.unshift({phone:m.from, name:v.contacts?.[0]?.profile?.name||m.from, text:m.text?.body||'Mensaje', time:new Date().toLocaleTimeString()});
  res.sendStatus(200);
});

app.get('/api/leads',(req,res)=>res.json(leads));

app.post('/api/campaign', async (req,res)=>{
  const {lista} = req.body;
  const IMAGE_URL = process.env.IMAGE_URL || 'https://i.ibb.co/nqYGp3sn/Whats-App-Image-2026-09-15-at-3-37-22-PM-2.jpg';
  console.log('Campaña acolbogota a', lista.length, 'con imagen', IMAGE_URL);
  let enviados=0;
  for(const c of lista){
    try{
      const r = await fetch(`https://graph.facebook.com/v20.0/${process.env.PHONE_NUMBER_ID}/messages`,{
        method:'POST',
        headers:{'Authorization':`Bearer ${process.env.WHATSAPP_TOKEN}`,'Content-Type':'application/json'},
        body: JSON.stringify({
          messaging_product:'whatsapp',
          to: c.phone,
          type:'template',
          template:{
            name:'acolbogota',
            language:{code:'es_CO'},
            components:[
              {type:'header', parameters:[{type:'image', image:{link: IMAGE_URL}}]},
              {type:'body', parameters:[]}
            ]
          }
        })
      });
      const data:any = await r.json();
      console.log('Resultado envio', c.phone, JSON.stringify(data).substring(0,200));
      enviados++;
    }catch(e){ console.log('Error', e); }
  }
  res.json({ok:true, enviados});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log('KLYDO AVANZA ONLINE puerto '+PORT));
