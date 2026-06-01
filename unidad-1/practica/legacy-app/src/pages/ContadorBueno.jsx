import React, { useState } from "react";

// Ejemplo con buen uso de setState
export default function ContadorBueno() {
  const [count, setCount] = useState(0);

  // Handler usando función de actualización
  const handleIncrement = () => {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Contador (buenas prácticas)</h2>
      <p>Valor: {count}</p>
      <button onClick={handleIncrement}>Sumar 3</button>
      <p style={{ color: 'green' }}>
        Ahora el contador funciona como esperas.
      </p>
    </div>
  );
}
