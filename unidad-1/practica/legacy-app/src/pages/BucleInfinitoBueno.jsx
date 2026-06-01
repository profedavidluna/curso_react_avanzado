import { useEffect, useState } from "react";

// Buen uso: actualizar una sola vez al montar, sin dependencias cíclicas.
export default function BucleInfinitoBueno() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect ejecutado una sola vez");
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Bucle infinito (buenas prácticas)</h2>
      <p>Valor: {count}</p>
      <p style={{ color: "green" }}>
        El estado se actualiza una vez y el componente no entra en bucle.
      </p>
    </div>
  );
}
