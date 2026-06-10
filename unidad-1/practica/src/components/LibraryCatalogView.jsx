import { useCallback, useMemo, useState } from 'react';
import { BookList } from './BookList';
import Header from './Header';

export function LibraryCatalogView({
  books,
  categories,
  getAuthorName,
  getCategoryName,
  onAddBookClick,
  onOpenDetails,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');

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

  const handleSearchQuery = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  const handleCategoryFilter = useCallback((value) => {
    setSelectedCategoryFilter(value);
  }, []);

  return (
    <>
      <Header
        currentView="books"
        searchQuery={searchQuery}
        setSearchQuery={handleSearchQuery}
        selectedCategoryFilter={selectedCategoryFilter}
        setSelectedCategoryFilter={handleCategoryFilter}
        categories={categories}
        onAddBookClick={onAddBookClick}
      />

      <div className="performance-summary-grid">
        <article className="performance-summary-card">
          <span className="performance-summary-label">Libros visibles</span>
          <strong className="performance-summary-value">{filteredBooks.length}</strong>
          <p>El cálculo se memoriza con `useMemo` y deja de ejecutarse en renders no relacionados.</p>
        </article>
        <article className="performance-summary-card">
          <span className="performance-summary-label">Segmentación aplicada</span>
          <strong className="performance-summary-value">Catálogo aislado</strong>
          <p>La búsqueda y el filtro viven en esta vista; `App` solo coordina datos y modales.</p>
        </article>
      </div>

      <BookList
        filteredBooks={filteredBooks}
        getAuthorName={getAuthorName}
        getCategoryName={getCategoryName}
        onOpenDetails={onOpenDetails}
      />
    </>
  );
}

export default LibraryCatalogView;
