
export function Header({ 
  currentView, 
  searchQuery, 
  setSearchQuery, 
  selectedCategoryFilter, 
  setSelectedCategoryFilter, 
  categories, 
  onAddBookClick 
}) {
  return (
    <div className="app-header">
      <div>
        <h1 className="app-title-main">
          {currentView === 'books' && 'Catálogo de Libros'}
          {currentView === 'authors' && 'Directorio de Autores'}
          {currentView === 'categories' && 'Categorías Literarias'}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '5px' }}>
          Gestión Avanzada del Sistema de Biblioteca
        </p>
      </div>

      {currentView === 'books' && (
        <div className="search-filter-box">
          <input 
            type="text" 
            className="search-input-field" 
            placeholder="Buscar por título o ISBN..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select 
            className="category-select-filter"
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
          >
            <option value="">Todas las Categorías</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button 
            className="add-book-button-action"
            onClick={onAddBookClick}
          >
            + Nuevo Libro
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
