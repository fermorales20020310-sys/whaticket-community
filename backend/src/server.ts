import express from 'express';
const app = express();
app.use(express.json());

let leads:any[]=[];
let contactos:any[]=[];

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
app.get('/api/contactos',(req,res)=>res.json(contactos));

app.post('/api/campaign', async (req,res)=>{
  const {lista} = req.body;
  const IMAGE_URL = process.env.IMAGE_URL || 'https://i.ibb.co/nqYGp3sn/Whats-App-Image-2026-09-15-at-3-37-22-PM-2.jpg';
  let enviados=0;
  for(const c of lista){
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
    const data = await r.json();
    console.log('Envio a', c.phone, data);
    enviados++;
  }
  res.json({ok:true, enviados});
});

app.use(express.static('public'));
app.listen(process.env.PORT||3000,()=>console.log('KLYDO AVANZA ONLINE con acolbogota + imagen'));
