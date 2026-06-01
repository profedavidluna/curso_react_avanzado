import { useEffect, useState } from "react";

function PerfilUsuarioMalo({ userId }) {
  const [descripcion, setDescripcion] = useState("Sin datos");

  useEffect(() => {
    setDescripcion(`Datos cargados para el usuario ${userId}`);
    console.log("Effect ejecutado solo al montar");
  }, []);

  return (
    <div style={{ marginTop: 12 }}>
      <p>Prop userId actual: {userId}</p>
      <p>Descripción mostrada: {descripcion}</p>
      <p style={{ color: "red" }}>
        Cambia el userId con los botones: la UI no se sincroniza porque falta la dependencia.
      </p>
    </div>
  );
}

export default function DependenciaMalo() {
  const [userId, setUserId] = useState(1);

  return (
    <div style={{ padding: 24 }}>
      <h2>Dependencias faltantes (mal uso de useEffect)</h2>
      <button onClick={() => setUserId(1)} style={{ marginRight: 8 }}>Usuario 1</button>
      <button onClick={() => setUserId(2)} style={{ marginRight: 8 }}>Usuario 2</button>
      <button onClick={() => setUserId(3)}>Usuario 3</button>
      <PerfilUsuarioMalo userId={userId} />
    </div>
  );
}
