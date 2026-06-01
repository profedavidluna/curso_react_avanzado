import { useEffect, useRef, useState } from "react";

// Buen uso: useRef conserva el valor previo sin render adicional.
export default function RefPrevioBueno() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Valor previo (buen uso con useRef)</h2>
      <p>Actual: {count}</p>
      <p>Previo: {prevCountRef.current}</p>
      <button onClick={() => setCount((c) => c + 1)}>Incrementar</button>
      <p style={{ color: "green", marginTop: 12 }}>
        useRef permite guardar datos mutables entre renders sin re-renderizar.
      </p>
    </div>
  );
}
