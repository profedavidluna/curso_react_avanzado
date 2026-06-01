import { useEffect, useState } from "react";

// Mal uso: el efecto depende de count y además actualiza count.
export default function BucleInfinitoMalo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect ejecutado, count:", count);
    setCount(count + 1);
  }, [count]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Bucle infinito (mal uso de useEffect)</h2>
      <p>Valor: {count}</p>
      <p style={{ color: "red" }}>
        Este componente entra en renderizado infinito porque el efecto modifica
        el mismo estado que observa.
      </p>
    </div>
  );
}
