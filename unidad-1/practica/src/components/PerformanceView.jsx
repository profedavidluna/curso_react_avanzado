import { useCallback, useState } from 'react';
import PerformanceChecklist from './PerformanceChecklist';
import PerformanceOverview from './PerformanceOverview';
import VirtualizedBookList from './VirtualizedBookList';
import { usePerformanceCatalog } from '../hooks/usePerformanceCatalog';

export function PerformanceView({
  books,
  categories,
  getAuthorName,
  getCategoryName,
  onOpenDetails,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('title');

  const { filteredBooks, stats } = usePerformanceCatalog({
    books,
    searchQuery,
    selectedCategoryFilter,
    sortBy,
  });

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleCategoryChange = useCallback((event) => {
    setSelectedCategoryFilter(event.target.value);
  }, []);

  const handleSortChange = useCallback((event) => {
    setSortBy(event.target.value);
  }, []);

  return (
    <section>
      <header className="performance-hero">
        <div>
          <p className="performance-kicker">Sección 3.3 · Estrategias avanzadas de rendimiento</p>
          <h1 className="app-title-main">Laboratorio de performance sobre la app de biblioteca</h1>
          <p className="performance-hero-copy">
            Usamos la misma aplicación de catálogo para mostrar tres ideas: virtualización de
            listas, segmentación de componentes pesados y buenas prácticas de performance.
          </p>
        </div>
        <div className="performance-hero-badge">
          <span>Dataset de trabajo</span>
          <strong>{stats.totalBooks}</strong>
        </div>
      </header>

      <div className="performance-toolbar">
        <label>
          Buscar por título o ISBN
          <input
            className="search-input-field"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Macondo, 978..., ciencia..."
          />
        </label>

        <label>
          Categoría
          <select
            className="category-select-filter"
            value={selectedCategoryFilter}
            onChange={handleCategoryChange}
          >
            <option value="">Todas</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Ordenar por
          <select className="category-select-filter" value={sortBy} onChange={handleSortChange}>
            <option value="title">Título</option>
            <option value="year">Año</option>
            <option value="pages">Páginas</option>
          </select>
        </label>
      </div>

      <PerformanceOverview stats={stats} />

      <div className="performance-layout">
        <VirtualizedBookList
          books={filteredBooks}
          getAuthorName={getAuthorName}
          getCategoryName={getCategoryName}
          onOpenDetails={onOpenDetails}
        />
        <PerformanceChecklist />
      </div>
    </section>
  );
}

export default PerformanceView;
