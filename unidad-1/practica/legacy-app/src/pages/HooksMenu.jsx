import { Link } from "react-router-dom";

const hooksMenu = [
  {
    category: "useState",
    exercises: [
      { path: "/hooks/usestate/contador", label: "Contador: errores comunes", good: "/hooks/usestate/contador-bueno" },
      { path: "/hooks/usestate/objeto", label: "Estado como objeto", good: "/hooks/usestate/objeto-bueno" },
      { path: "/hooks/usestate/props", label: "Estado derivado de props", good: "/hooks/usestate/props-bueno" },
    ],
  },
  {
    category: "useMemo",
    exercises: [
      { path: "/hooks/usememo/rendimiento", label: "Rendimiento: calculo costoso", good: "/hooks/usememo/rendimiento-bueno" },
      { path: "/hooks/usememo/dependencias", label: "Dependencias incorrectas", good: "/hooks/usememo/dependencias-bueno" },
    ],
  },
  {
    category: "useRef",
    exercises: [
      { path: "/hooks/useref/focus", label: "Referencia DOM para focus", good: "/hooks/useref/focus-bueno" },
      { path: "/hooks/useref/previo", label: "Guardar valor previo", good: "/hooks/useref/previo-bueno" },
    ],
  },
  {
    category: "useEffect",
    exercises: [
      { path: "/hooks/useeffect/intervalo", label: "Intervalo: dependencias y limpieza", good: "/hooks/useeffect/intervalo-bueno" },
      { path: "/hooks/useeffect/bucle", label: "Bucle infinito por dependencias", good: "/hooks/useeffect/bucle-bueno" },
      { path: "/hooks/useeffect/dependencias", label: "Dependencia faltante con props", good: "/hooks/useeffect/dependencias-bueno" },
    ],
  },
];

export default function HooksMenu() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Ejercicios de Hooks</h2>
      {hooksMenu.map((section) => (
        <div key={section.category} style={{ marginBottom: 24 }}>
          <h3>{section.category}</h3>
          <ul>
            {section.exercises.length === 0 && <li>Próximamente...</li>}
            {section.exercises.map((ex) => (
              <li key={ex.path}>
                <Link to={ex.path}>{ex.label}</Link>
                {ex.good && (
                  <>
                    {" | "}
                    <Link to={ex.good}>Ver buenas prácticas</Link>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
