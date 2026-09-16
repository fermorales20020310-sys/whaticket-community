import React from "react";

const KlydoAvance = () => {
  return (
    <div style={{display:"flex", height:"100vh", background:"#f1f5f9"}}>
      <div style={{width:"300px", background:"#1e3a5f", color:"white", padding:"20px"}}>
        <h2 style={{fontSize:"22px", fontWeight:"bold"}}>KLYDO AVANZA</h2>
        <button style={{background:"#22c55e", color:"white", width:"100%", padding:"10px", borderRadius:"8px", marginTop:"15px"}}>+ Nueva Campaña</button>
        <p style={{marginTop:"20px", opacity:0.8}}>Clientes</p>
      </div>
      <div style={{flex:1, padding:"20px"}}>
        <h1>KANBAN - Construccion</h1>
        <div style={{display:"flex", gap:"10px", marginTop:"20px"}}>
          <div style={{background:"white", padding:"20px", borderRadius:"8px", flex:1}}>Nuevos</div>
          <div style={{background:"white", padding:"20px", borderRadius:"8px", flex:1}}>HOT</div>
          <div style={{background:"white", padding:"20px", borderRadius:"8px", flex:1}}>Cerrados</div>
        </div>
      </div>
    </div>
  );
};
export default KlydoAvance;
