export function CourseList({ courses }) {
  if (courses.length === 0) {
    return <p>No hay resultados para los filtros seleccionados.</p>;
  }

  return (
    <section>
      <h2>Cursos disponibles</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <strong>{course.title}</strong> · <span>{course.level}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
