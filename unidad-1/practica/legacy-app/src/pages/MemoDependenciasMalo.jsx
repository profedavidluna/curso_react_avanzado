import { useMemo, useState } from "react";

const cursos = [
  "React Basico",
  "React Intermedio",
  "React Avanzado",
  "TypeScript para React",
  "Testing con React",
];

export default function MemoDependenciasMalo() {
  const [query, setQuery] = useState("react");

  const filtrados = useMemo(() => {
    console.log("Filtrando cursos...");
    return cursos.filter((c) => c.toLowerCase().includes(query.toLowerCase()));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>useMemo dependencias (mal uso)</h2>
      <p>
        Este memo usa dependencias vacias aunque depende de query. El resultado queda
        congelado y no se actualiza al escribir.
      </p>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar curso"
      />
      <ul style={{ marginTop: 12 }}>
        {filtrados.map((curso) => (
          <li key={curso}>{curso}</li>
        ))}
      </ul>
      <p style={{ color: "red" }}>La lista no sigue el input por dependencias incorrectas.</p>
    </div>
  );
}
