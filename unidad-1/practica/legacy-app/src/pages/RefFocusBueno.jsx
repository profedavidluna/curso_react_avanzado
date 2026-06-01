import { useRef, useState } from "react";

// Buen uso: guardar el nodo DOM en useRef no dispara renders.
export default function RefFocusBueno() {
  const inputRef = useRef(null);
  const [renderCount, setRenderCount] = useState(1);

  const forceRender = () => setRenderCount((prev) => prev + 1);

  return (
    <div style={{ padding: 24 }}>
      <h2>Enfocar input (buen uso con useRef)</h2>
      <p>Render count: {renderCount}</p>
      <input ref={inputRef} placeholder="Escribe algo" />
      <div style={{ marginTop: 12 }}>
        <button
          onClick={() => inputRef.current?.focus()}
          style={{ marginRight: 8 }}
        >
          Enfocar
        </button>
        <button onClick={forceRender}>Forzar render</button>
      </div>
      <p style={{ color: "green", marginTop: 12 }}>
        El nodo DOM vive en ref y no genera renders adicionales.
      </p>
    </div>
  );
}
