import React from "react";

const KlydoAvance = () => {
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      {/* LADO IZQ */}
      <div style={{ width: "300px", background: "#1e3a5f", color: "white", padding: "20px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>KLYDO AVANZA</h2>
        <button style={{ background: "#22c55e", color: "white", width: "100%", padding: "12px", borderRadius: "8px", marginTop: "15px", fontWeight: "bold", border: "none" }}>
          + Nueva Campaña
        </button>
        <div style={{ marginTop: "25px" }}>
          <p style={{ fontWeight: "bold", marginBottom: "10px" }}>Conversaciones</p>
          <div style={{ background: "#2d4a70", padding: "10px", borderRadius: "8px", marginBottom: "8px" }}>Constructora Torre Norte</div>
          <div style={{ background: "#2d4a70", padding: "10px", borderRadius: "8px", marginBottom: "8px" }}>Ferretería Los Andes</div>
          <div style={{ background: "#2d4a70", padding: "10px", borderRadius: "8px" }}>Maestro Juan Pérez</div>
        </div>
      </div>

      {/* CENTRO */}
      <div style={{ flex: 1, background: "#f1f5f9", padding: "20px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>KANBAN - Construcción</h1>
        <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
          <div style={{ background: "white", flex: 1, padding: "15px", borderRadius: "10px" }}><b>Nuevos</b><p style={{ marginTop: "10px", border: "1px solid #ddd", padding: "10px", borderRadius: "6px" }}>$12,500 - Torre Norte</p></div>
          <div style={{ background: "white", flex: 1, padding: "15px", borderRadius: "10px" }}><b>HOT</b><p style={{ marginTop: "10px", border: "1px solid #ddd", padding: "10px", borderRadius: "6px" }}>$6,400 - Juan Pérez</p></div>
          <div style={{ background: "white", flex: 1, padding: "15px", borderRadius: "10px" }}><b>Cerrados</b><p style={{ marginTop: "10px", color: "#999" }}>0 clientes</p></div>
        </div>
      </div>

      {/* DERECHA */}
      <div style={{ width: "320px", background: "white", padding: "15px", borderLeft: "1px solid #ddd" }}>
        <h3 style={{ fontWeight: "bold", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>Chat 1631</h3>
        <div style={{ marginTop: "15px", background: "#f0f0f0", padding: "10px", borderRadius: "8px" }}>Hola, ¿tienen cemento 50kg?</div>
      </div>
    </div>
  );
};

export default KlydoAvance;
