import React, { useState, useEffect } from "react";

// Buenas prácticas: Limpiar el intervalo y dependencias correctas
export default function IntervaloBueno() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1);
      console.log("Intervalo ejecutado");
    }, 1000);
    return () => {
      clearInterval(id);
      console.log("Intervalo limpiado");
    };
  }, []); // Solo se ejecuta una vez al montar

  return (
    <div style={{ padding: 24 }}>
      <h2>Intervalo (buenas prácticas con useEffect)</h2>
      <p>El contador aumenta de uno en uno cada segundo.</p>
      <p>Valor: {count}</p>
      <p style={{ color: 'green' }}>
        El intervalo se limpia correctamente al desmontar.<br/>
        Revisa la consola para ver la limpieza.
      </p>
    </div>
  );
}
