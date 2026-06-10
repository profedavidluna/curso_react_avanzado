import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { initialAuthors, initialBooks, initialCategories } from './mockData';
import AuthorList from './components/AuthorList';
import BookForm from './components/BookForm';
import CategoryList from './components/CategoryList';
import LibraryCatalogView from './components/LibraryCatalogView';
import Modal from './components/Modal';
import PerformanceView from './components/PerformanceView';
import Sidebar from './components/Sidebar';

function getNextBookNumericId(baseBooks) {
  // La app usa IDs del tipo `b{n}` en su dataset base; si aparece otro formato,
  // simplemente no participa en el cálculo incremental y se conserva el máximo válido.
  const maxId = baseBooks.reduce((currentMax, book) => {
    const numericId = Number.parseInt(book.id.replace(/^b/, ''), 10);
    return Number.isNaN(numericId) ? currentMax : Math.max(currentMax, numericId);
  }, 0);

  return maxId + 1;
}

function App() {
  const [currentView, setCurrentView] = useState('books');
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedBookForDetail, setSelectedBookForDetail] = useState(null);
  const [activeDetailTab, setActiveDetailTab] = useState('info');
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const nextBookIdRef = useRef(getNextBookNumericId(initialBooks));

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooks(initialBooks);
      setAuthors(initialAuthors);
      setCategories(initialCategories);
      nextBookIdRef.current = getNextBookNumericId(initialBooks);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const authorNameById = useMemo(
    () => Object.fromEntries(authors.map((author) => [author.id, author.name])),
    [authors],
  );

  const categoryNameById = useMemo(
    () => Object.fromEntries(categories.map((category) => [category.id, category.name])),
    [categories],
  );

  const getAuthorName = useCallback(
    (authorId) => authorNameById[authorId] ?? 'Autor desconocido',
    [authorNameById],
  );

  const getCategoryName = useCallback(
    (categoryId) => categoryNameById[categoryId] ?? 'Sin categoría',
    [categoryNameById],
  );

  const handleCreateBookSubmit = useCallback((formData) => {
    const normalizedTitle = formData.title.trim();
    const normalizedAuthorId = formData.authorId.trim();
    const normalizedCategoryId = formData.categoryId.trim();

    if (!normalizedTitle || !normalizedAuthorId || !normalizedCategoryId) {
      return false;
    }

    const nextId = `b${nextBookIdRef.current}`;
    nextBookIdRef.current += 1;

    const nextBook = {
      id: nextId,
      title: normalizedTitle,
      authorId: normalizedAuthorId,
      categoryId: normalizedCategoryId,
      isbn: formData.isbn.trim() || 'N/A',
      pages: Number.parseInt(formData.pages, 10) || 0,
      year: Number.parseInt(formData.year, 10) || new Date().getFullYear(),
      summary: formData.summary.trim() || 'Sin resumen disponible.',
      coverUrl:
        formData.coverUrl.trim() ||
        'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80',
      reviews: [],
      loans: [],
    };

    setBooks((previousBooks) => [nextBook, ...previousBooks]);
    setIsAddBookModalOpen(false);
    return true;
  }, []);

  const openBookDetails = useCallback((book) => {
    setSelectedBookForDetail(book);
    setActiveDetailTab('info');
    setIsDetailModalOpen(true);
  }, []);

  const closeDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
  }, []);

  return (
    <div>
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      <div className="main-wrapper">
        {isLoading ? (
          <div className="loading-state-panel">Cargando datos del sistema...</div>
        ) : (
          <>
            {currentView === 'books' && (
              <LibraryCatalogView
                books={books}
                categories={categories}
                getAuthorName={getAuthorName}
                getCategoryName={getCategoryName}
                onAddBookClick={() => setIsAddBookModalOpen(true)}
                onOpenDetails={openBookDetails}
              />
            )}

            {currentView === 'authors' && <AuthorList authors={authors} />}

            {currentView === 'categories' && <CategoryList categories={categories} />}

            {currentView === 'performance' && (
              <PerformanceView
                books={books}
                categories={categories}
                getAuthorName={getAuthorName}
                getCategoryName={getCategoryName}
                onOpenDetails={openBookDetails}
              />
            )}
          </>
        )}
      </div>

      <Modal
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        book={selectedBookForDetail}
        getAuthorName={getAuthorName}
        getCategoryName={getCategoryName}
        activeDetailTab={activeDetailTab}
        setActiveDetailTab={setActiveDetailTab}
      />

      {isAddBookModalOpen && (
        <div className="modal-overlay-bg" onClick={() => setIsAddBookModalOpen(false)}>
          <div className="modal-content-box" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header-section">
              <h2 className="modal-title-text">Registrar Nuevo Libro</h2>
              <button
                className="modal-close-icon"
                onClick={() => setIsAddBookModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body-section">
              <BookForm
                authors={authors}
                categories={categories}
                onCancel={() => setIsAddBookModalOpen(false)}
                onSubmit={handleCreateBookSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
