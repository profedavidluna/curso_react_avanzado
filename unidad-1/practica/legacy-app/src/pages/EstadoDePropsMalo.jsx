import React, { useState } from "react";

// Estado derivado de props (mal uso)
export default function EstadoDePropsMalo({ valorInicial = 5 }) {
  const [valor, setValor] = useState(valorInicial);

  // Simula cambio de prop (en la vida real, esto vendría del padre)
  // Aquí solo mostramos el problema: si valorInicial cambia, el estado no se actualiza

  return (
    <div style={{ padding: 24 }}>
      <h2>Estado derivado de props (mal uso)</h2>
      <p>Prop valorInicial: {valorInicial}</p>
      <p>Estado valor: {valor}</p>
      <button onClick={() => setValor(valor + 1)}>Incrementar</button>
      <p style={{ color: 'red' }}>
        Si el prop cambia, el estado no se actualiza.<br/>
        (Simula cambiando el valorInicial en el código y recargando la página)
      </p>
    </div>
  );
}
