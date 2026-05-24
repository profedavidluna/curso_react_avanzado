export function CourseFilters({ filters, onChange }) {
  const handleFieldChange = (field, value) => {
    onChange((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  };

  return (
    <section>
      <h2>Filtros</h2>
      <label>
        Buscar curso
        <input
          value={filters.search}
          onChange={(event) => handleFieldChange('search', event.target.value)}
        />
      </label>

      <label>
        Nivel
        <select
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
