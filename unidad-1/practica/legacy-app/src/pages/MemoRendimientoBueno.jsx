import { useMemo, useState } from "react";

function calcularResultadoLento(valor) {
  console.log("Recalculando resultado lento...");
  let total = 0;
  for (let i = 0; i < 30_000_000; i += 1) {
    total += i % 10;
  }
  return `${valor.toUpperCase()} - score ${total}`;
}

export default function MemoRendimientoBueno() {
  const [texto, setTexto] = useState("react");
  const [contador, setContador] = useState(0);

  const resultado = useMemo(() => calcularResultadoLento(texto), [texto]);

  return (
    <div style={{ padding: 24 }}>
      <h2>useMemo rendimiento (buenas practicas)</h2>
      <p>
        El calculo pesado solo se ejecuta cuando cambia el texto. Cambiar el contador
        ya no dispara recalculo.
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
      <p style={{ color: "green" }}>Revisa la consola para confirmar menos recalculos.</p>
    </div>
  );
}
