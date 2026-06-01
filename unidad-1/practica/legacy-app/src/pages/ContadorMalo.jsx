import React, { useState } from "react";

// Ejemplo con mal uso de setState
export default function ContadorMalo() {
  const [count, setCount] = useState(0);
  const init = () => {
  console.log("function init called.");
  return Math.floor(Math.random() * 10 + 1);
}


  const [clicks, setClicks] = useState(init);


 function incClicks() {
    setClicks(clicks + 1);
  }


  // Handler que hace 3 incrementos seguidos
  const handleIncrement = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log('Valor de count en el click:', count);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Contador (mal uso de setState)</h2>
      <p>Valor: {count}</p>
      <button onClick={handleIncrement}>Sumar 3</button>
      <p style={{ color: 'red' }}>
        ¿Qué esperas que pase? ¿Qué pasa realmente?
      </p>
      <p>
        <b>Tip:</b> Abre la consola y prueba hacer click varias veces.
      </p>
          <div>
      <h1>Click times: {clicks}</h1>
      <button onClick={incClicks}>Click me!</button>
    </div>
    </div>
  );
}
