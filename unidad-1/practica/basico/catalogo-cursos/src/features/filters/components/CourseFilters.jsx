export function CourseFilters({ filters, onChange }) {
  const searchInputId = 'course-search';
  const levelSelectId = 'course-level';

  const handleFieldChange = (field, value) => {
    onChange((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  };

  return (
    <section>
      <h2>Filtros</h2>
      <label htmlFor={searchInputId}>
        Buscar curso
        <input
          id={searchInputId}
          type="text"
          value={filters.search}
          onChange={(event) => handleFieldChange('search', event.target.value)}
        />
      </label>

      <label htmlFor={levelSelectId}>
        Nivel
        <select
          id={levelSelectId}
          value={filters.level}
          onChange={(event) => handleFieldChange('level', event.target.value)}
        >
          <option value="all">Todos</option>
          <option value="basic">Básico</option>
          <option value="intermediate">Intermedio</option>
          <option value="advanced">Avanzado</option>
        </select>
      </label>
    </section>
  );
}
