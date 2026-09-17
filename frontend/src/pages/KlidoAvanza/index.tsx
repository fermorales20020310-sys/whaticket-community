import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: { background: "#F5F7FB", minHeight: "100vh", display: "flex" },
  sidebar: { width: 260, background: "#0A3D8F", color: "white", padding: 20 },
  content: { flex: 1, padding: 30 },
  card: { background: "white", borderRadius: 12, padding: 20, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }
});

export default function KlidoAvanza() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 260, background: "#0A3D8F", minHeight: "100vh", color: "white", padding: 20 }}>
        <h2>KLIDO AVANZA</h2>
        <p>Dashboard</p>
        <p style={{ background: "white", color: "#0A3D8F", padding: 10, borderRadius: 8 }}>Inbox</p>
        <p>Campañas</p>
        <p>Contactos</p>
        <p>Segmentación</p>
        <p>Plantillas</p>
      </div>
      <div style={{ flex: 1, padding: 20 }}>
        {/* Aquí va el Inbox que ya tienes, pero pintado de azul */}
        <h1 style={{ color: "#0A3D8F" }}>Bandeja de Entrada</h1>
        <p>Conectado a Cloud API Oficial</p>
      </div>
    </div>
  );
}
