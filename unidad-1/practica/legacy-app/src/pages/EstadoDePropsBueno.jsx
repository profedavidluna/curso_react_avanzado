import React, { useState, useEffect } from "react";

// Buen manejo de estado derivado de props
export default function EstadoDePropsBueno({ valorInicial = 5 }) {
  const [valor, setValor] = useState(valorInicial);

  // Sincroniza el estado si cambia el prop
  useEffect(() => {
    setValor(valorInicial);
  }, [valorInicial]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Estado derivado de props (buenas prácticas)</h2>
      <p>Prop valorInicial: {valorInicial}</p>
      <p>Estado valor: {valor}</p>
      <button onClick={() => setValor(valor + 1)}>Incrementar</button>
      <p style={{ color: 'green' }}>
        Si el prop cambia, el estado se sincroniza correctamente.<br/>
        (Simula cambiando el valorInicial en el código y recargando la página)
      </p>
    </div>
  );
}
