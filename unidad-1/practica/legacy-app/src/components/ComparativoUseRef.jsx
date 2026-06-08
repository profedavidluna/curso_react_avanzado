import { useState, useRef } from "react";

export const ComparativoUseRef = () => {
  // 1. Variable Reactiva
  const [gemasState, setGemasState] = useState(0); 
  
  // 2. Variable Silenciosa (Inicia en 0)
  const gemasRef = useRef(0); 

  const recolectarGemaState = () => {
    setGemasState(gemasState + 1); // ¡Dispara re-render!
  };

  const recolectarGemaRef = () => {
    gemasRef.current += 1; // Mutación síncrona. ¡NO dispara re-render! [22]
    console.log("Gemas en Ref:", gemasRef.current);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h3>Comparativa de Recolección</h3>
      
      {/* Al hacer clic, la pantalla se actualiza enseguida */}
      <p>Gemas (useState): {gemasState}</p>
      <button onClick={recolectarGemaState}>Sumar Gema (State)</button>

      <hr />

      {/* Al hacer clic, el valor sube en consola, pero la pantalla NO se actualiza */}
      <p>Gemas (useRef): {gemasRef.current}</p>
      <button onClick={recolectarGemaRef}>Sumar Gema (Ref)</button>
    </div>
  );
};