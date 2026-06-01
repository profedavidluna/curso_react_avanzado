import { useEffect, useState } from "react";

// Mal uso: usar estado para guardar valor previo añade renders extra.
export default function RefPrevioMalo() {
  const [count, setCount] = useState(0);
  const [prevCount, setPrevCount] = useState(0);

  useEffect(() => {
    setPrevCount(count);
  }, [count]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Valor previo (mal uso sin useRef)</h2>
      <p>Actual: {count}</p>
      <p>Previo: {prevCount}</p>
      <button onClick={() => setCount((c) => c + 1)}>Incrementar</button>
      <p style={{ color: "red", marginTop: 12 }}>
        Almacenar "previo" en estado provoca un render adicional en cada cambio.
      </p>
    </div>
  );
}
