import { useState } from "react";

// Mal uso: guardar nodo DOM en estado provoca renders extra innecesarios.
export default function RefFocusMalo() {
  const [inputNode, setInputNode] = useState(null);
  const [renderCount, setRenderCount] = useState(1);

  const forceRender = () => setRenderCount((prev) => prev + 1);

  return (
    <div style={{ padding: 24 }}>
      <h2>Enfocar input (mal uso: estado en lugar de useRef)</h2>
      <p>Render count: {renderCount}</p>
      <input ref={setInputNode} placeholder="Escribe algo" />
      <div style={{ marginTop: 12 }}>
        <button
          onClick={() => inputNode?.focus()}
          style={{ marginRight: 8 }}
        >
          Enfocar
        </button>
        <button onClick={forceRender}>Forzar render</button>
      </div>
      <p style={{ color: "red", marginTop: 12 }}>
        Funciona, pero el nodo DOM está en estado y puede disparar renders evitables.
      </p>
    </div>
  );
}
