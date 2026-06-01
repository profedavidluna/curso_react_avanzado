import React, { useState, useEffect } from "react";

// Mal uso: Intervalo sin limpiar y dependencias incorrectas
export default function IntervaloMalo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1);
      console.log("Intervalo ejecutado");
    }, 1000);
    // No hay return para limpiar el intervalo
  }); // Sin dependencias: se ejecuta en cada render

  return (
    <div style={{ padding: 24 }}>
      <h2>Intervalo (mal uso de useEffect)</h2>
      <p>El contador debería aumentar de uno en uno cada segundo.</p>
      <p>Valor: {count}</p>
      <p style={{ color: 'red' }}>
        ¿Qué sucede si navegas fuera y vuelves? ¿El contador se acelera?<br/>
        Abre la consola para ver cuántos intervalos se crean.
      </p>
    </div>
  );
}
