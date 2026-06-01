import { useState } from "react";

function calcularResultadoLento(valor) {
  console.log("Recalculando resultado lento...");
  let total = 0;
  for (let i = 0; i < 30_000_000; i += 1) {
    total += i % 10;
  }
  return `${valor.toUpperCase()} - score ${total}`;
}

export default function MemoRendimientoMalo() {
  const [texto, setTexto] = useState("react");
  const [contador, setContador] = useState(0);

  const resultado = calcularResultadoLento(texto);

  return (
    <div style={{ padding: 24 }}>
      <h2>useMemo rendimiento (mal uso)</h2>
      <p>
        Escribe en el input y luego pulsa "Incrementar contador". Notarás que el
        cálculo pesado se ejecuta en cada render, incluso cuando cambia algo no relacionado.
      </p>
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Texto"
        style={{ marginRight: 8 }}
      />
      <button onClick={() => setContador((c) => c + 1)}>
        Incrementar contador ({contador})
      </button>
      <p style={{ marginTop: 12 }}>Resultado: {resultado}</p>
      <p style={{ color: "red" }}>Revisa la consola para ver recalculos innecesarios.</p>
    </div>
  );
}
