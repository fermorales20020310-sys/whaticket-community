import React, { useState } from "react";

const KlydoAvance = () => {
  const [filtro, setFiltro] = useState("Todos");

  const clientes = [
    { id: 1, nombre: "Constructora Torre Norte", tipo: "Constructor", estado: "Nuevos", msg: "¿Tienen stock de cemento gris 50kg?", valor: "$12,500", tiempo: "Hace 5 min" },
    { id: 2, nombre: "Ferretería Los Andes", tipo: "Ferretería", estado: "En Proceso", msg: "Cotización aprobada, esperando pago", valor: "$4,200", tiempo: "Hace 22 min" },
    { id: 3, nombre: "Maestro Juan Pérez", tipo: "Maestro", estado: "HOT", msg: "Necesito 20 varillas 1/2 para mañana", valor: "$6,400", tiempo: "Hace 1h" },
  ];

  const columnas = ["Nuevos", "En Proceso", "HOT", "COLD", "Cerrados"];

  const colorTipo = (t: string) => t === "Constructor"? "bg-blue-600" : t === "Ferretería"? "bg-orange-500" : "bg-purple-600";

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-white p-4 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold text-blue-900">KLYDO AVANZA</h1>
        <button className="bg-green-500 text-white px-5 py-2 rounded-lg font-bold">+ Nueva Campaña</button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* IZQUIERDA - CONVERSACIONES */}
        <div className="w-80 bg-[#1e3a5f] text-white p-3 overflow-y-auto">
          <h3 className="font-bold mb-3">Conversaciones</h3>
          {clientes.map(c => (
            <div key={c.id} className="bg-blue-800/50 p-3 rounded-lg mb-2 cursor-pointer hover:bg-blue-700">
              <div className="font-bold text-sm">{c.nombre}</div>
              <span className={`${colorTipo(c.tipo)} text-xs px-2 py-0.5 rounded`}>{c.tipo}</span>
              <div className="text-xs mt-1 opacity-80">{c.msg}</div>
              <div className="text-xs opacity-50">{c.tiempo}</div>
            </div>
          ))}
        </div>

        {/* CENTRO - KANBAN */}
        <div className="flex-1 p-4 flex gap-3 overflow-x-auto">
          {columnas.map(col => (
            <div key={col} className="min-w-[220px] bg-white rounded-xl p-3 shadow-sm">
              <h3 className="font-bold text-center mb-3">{col} <span className="bg-gray-200 px-2 rounded text-sm">{clientes.filter(x=>x.estado===col).length}</span></h3>
              {clientes.filter(x=>x.estado===col).map(c => (
                <div key={c.id} className="border rounded-lg p-3 mb-2 bg-white shadow">
                  <span className={`${colorTipo(c.tipo)} text-white text-xs px-2 py-0.5 rounded`}>{c.tipo}</span>
                  <div className="font-bold text-sm mt-1">{c.nombre}</div>
                  <div className="text-sm text-gray-600">{c.valor}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* DERECHA - CHAT */}
        <div className="w-96 bg-white border-l p-3 flex flex-col">
          <h3 className="font-bold border-b pb-2">Chat en Vivo - WhatsApp</h3>
          <div className="flex-1 p-2 text-sm">
            <div className="bg-gray-100 p-2 rounded-lg mb-2">Hola, ¿Tienen disponible cemento gris 50kg? Necesitamos 50 sacos</div>
            <div className="bg-green-100 p-2 rounded-lg mb-2 ml-6">¡Hola! Sí, tenemos stock. $250 por saco, total $12,500.</div>
          </div>
          <input placeholder="Escribe un mensaje..." className="border rounded-full px-4 py-2 w-full" />
        </div>
      </div>
    </div>
  );
};

export default KlydoAvance;
