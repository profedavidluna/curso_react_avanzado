import { useMemo, useState, useTransition } from 'react';
import BookList from './BookList';

function TransitionBooksView({ books, categories, getAuthorName, getCategoryName, onOpenDetails }) {
  const [draftSearchQuery, setDraftSearchQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');
  const [isPending, startTransition] = useTransition();

  const filteredBooks = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase().trim();

    return books.filter((book) => {
      const matchesSearch =
        normalizedQuery === '' ||
        book.title.toLowerCase().includes(normalizedQuery) ||
        book.isbn.includes(normalizedQuery);
      const matchesCategory =
        selectedCategoryFilter === '' || book.categoryId === selectedCategoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [books, searchQuery, selectedCategoryFilter]);

  const handleSearchChange = (event) => {
    const nextValue = event.target.value;
    setDraftSearchQuery(nextValue);

    startTransition(() => {
      setSearchQuery(nextValue);
    });
  };

  const handleCategoryChange = (event) => {
    const nextValue = event.target.value;

    startTransition(() => {
      setSelectedCategoryFilter(nextValue);
    });
  };

  return (
    <section>
      <header className="performance-hero" style={{ marginBottom: '20px' }}>
        <div>
          <p className="performance-kicker">Sección extra · React concurrente</p>
          <h1 className="app-title-main">Catálogo con useTransition</h1>
          <p className="performance-hero-copy">
            El input responde de inmediato (`draftSearchQuery`) mientras el filtro principal se
            actualiza como transición no urgente (`searchQuery`).
          </p>
        </div>
        <div className="performance-hero-badge">
          <span>Estado</span>
          <strong>{isPending ? 'Filtrando...' : 'Listo'}</strong>
        </div>
      </header>

      <div className="search-filter-box" style={{ marginBottom: '16px' }}>
        <input
          type="text"
          className="search-input-field"
          placeholder="Buscar por título o ISBN..."
          value={draftSearchQuery}
          onChange={handleSearchChange}
        />
        <select
          className="category-select-filter"
          value={selectedCategoryFilter}
          onChange={handleCategoryChange}
        >
          <option value="">Todas las Categorías</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="performance-summary-grid" style={{ marginBottom: '16px' }}>
        <article className="performance-summary-card">
          <span className="performance-summary-label">Texto mostrado en input</span>
          <strong className="performance-summary-value">{draftSearchQuery || 'Sin búsqueda'}</strong>
        </article>
        <article className="performance-summary-card">
          <span className="performance-summary-label">Consulta aplicada al filtro</span>
          <strong className="performance-summary-value">{searchQuery || 'Sin búsqueda'}</strong>
        </article>
        <article className="performance-summary-card">
          <span className="performance-summary-label">Resultados visibles</span>
          <strong className="performance-summary-value">{filteredBooks.length}</strong>
        </article>
      </div>

      <BookList
        filteredBooks={filteredBooks}
        getAuthorName={getAuthorName}
        getCategoryName={getCategoryName}
        onOpenDetails={onOpenDetails}
      />
    </section>
  );
}

export default TransitionBooksView;