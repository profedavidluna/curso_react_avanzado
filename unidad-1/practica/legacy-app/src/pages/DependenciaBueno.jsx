import { useEffect, useState } from "react";

function PerfilUsuarioBueno({ userId }) {
  const [descripcion, setDescripcion] = useState("Sin datos");

  useEffect(() => {
    setDescripcion(`Datos cargados para el usuario ${userId}`);
    console.log("Effect ejecutado con userId:", userId);
  }, [userId]);

  return (
    <div style={{ marginTop: 12 }}>
      <p>Prop userId actual: {userId}</p>
      <p>Descripción mostrada: {descripcion}</p>
      <p style={{ color: "green" }}>
        La UI se mantiene sincronizada porque el efecto declara la dependencia correcta.
      </p>
    </div>
  );
}

export default function DependenciaBueno() {
  const [userId, setUserId] = useState(1);

  return (
    <div style={{ padding: 24 }}>
      <h2>Dependencias correctas (buenas prácticas)</h2>
      <button onClick={() => setUserId(1)} style={{ marginRight: 8 }}>Usuario 1</button>
      <button onClick={() => setUserId(2)} style={{ marginRight: 8 }}>Usuario 2</button>
      <button onClick={() => setUserId(3)}>Usuario 3</button>
      <PerfilUsuarioBueno userId={userId} />
    </div>
  );
}
