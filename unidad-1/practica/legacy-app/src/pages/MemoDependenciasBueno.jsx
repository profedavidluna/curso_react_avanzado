import { useMemo, useState } from "react";

const cursos = [
  "React Basico",
  "React Intermedio",
  "React Avanzado",
  "TypeScript para React",
  "Testing con React",
];

export default function MemoDependenciasBueno() {
  const [query, setQuery] = useState("react");

  const filtrados = useMemo(() => {
    console.log("Filtrando cursos...");
    return cursos.filter((c) => c.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <div style={{ padding: 24 }}>
      <h2>useMemo dependencias (buenas practicas)</h2>
      <p>
        Ahora el memo declara query como dependencia y la lista se actualiza
        correctamente.
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
      <p style={{ color: "green" }}>La lista sigue el input sin recalculos innecesarios.</p>
    </div>
  );
}
