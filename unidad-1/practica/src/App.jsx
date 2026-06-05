import { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BookList from './components/BookList';
import AuthorList from './components/AuthorList';
import CategoryList from './components/CategoryList';
import Modal from './components/Modal';
import BookForm from './components/BookForm';
import { UserPreferencesPanel } from './components/UserPreferencesPanel';
import { useApiData } from './hooks/useApiData';

function App() {
  const { books, authors, categories, isLoading, apiStatus, addBook } = useApiData();
  const [currentView, setCurrentView] = useState('books');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedBookForDetail, setSelectedBookForDetail] = useState(null);
  const [activeDetailTab, setActiveDetailTab] = useState('info');
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

  const [formTitle, setFormTitle] = useState('');
  const [formAuthorId, setFormAuthorId] = useState('');
  const [formCategoryId, setFormCategoryId] = useState('');
  const [formIsbn, setFormIsbn] = useState('');
  const [formPages, setFormPages] = useState('');
  const [formYear, setFormYear] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formCoverUrl, setFormCoverUrl] = useState('');

  const filteredBooks = useMemo(
    () =>
      books.filter((book) => {
        const matchesSearch =
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.isbn.includes(searchQuery);
        const matchesCategory = selectedCategoryFilter === '' || book.categoryId === selectedCategoryFilter;
        return matchesSearch && matchesCategory;
      }),
    [books, searchQuery, selectedCategoryFilter],
  );

  const getAuthorName = (authorId) => {
    const author = authors.find((entry) => entry.id === authorId);
    return author ? author.name : 'Autor Desconocido';
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((entry) => entry.id === categoryId);
    return category ? category.name : 'Sin Categoría';
  };

  const resetBookForm = () => {
    setFormTitle('');
    setFormAuthorId('');
    setFormCategoryId('');
    setFormIsbn('');
    setFormPages('');
    setFormYear('');
    setFormSummary('');
    setFormCoverUrl('');
  };

  const handleCreateBookSubmit = (event) => {
    event.preventDefault();

    if (!formTitle || !formAuthorId || !formCategoryId) {
      alert('Por favor, rellene los campos obligatorios (Título, Autor y Categoría)');
      return;
    }

    const newBook = {
      id: `b_${crypto.randomUUID()}`,
      title: formTitle,
      authorId: formAuthorId,
      categoryId: formCategoryId,
      isbn: formIsbn || 'N/A',
      pages: Number.parseInt(formPages, 10) || 0,
      year: Number.parseInt(formYear, 10) || new Date().getFullYear(),
      summary: formSummary || 'Sin resumen disponible.',
      coverUrl: formCoverUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80',
      reviews: [],
      loans: [],
    };

    addBook(newBook);
    resetBookForm();
    setIsAddBookModalOpen(false);
  };

  const openBookDetails = (book) => {
    setSelectedBookForDetail(book);
    setActiveDetailTab('info');
    setIsDetailModalOpen(true);
  };

  return (
    <div>
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      <div className="main-wrapper">
        <Header
          currentView={currentView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategoryFilter={selectedCategoryFilter}
          setSelectedCategoryFilter={setSelectedCategoryFilter}
          onAddBookClick={() => setIsAddBookModalOpen(true)}
        />

        {currentView === 'books' && (
          <section
            style={{
              marginBottom: '20px',
              border: '1px solid #334155',
              backgroundColor: '#1e293b',
              borderRadius: '10px',
              padding: '12px',
              fontSize: '13px',
            }}
          >
            <strong style={{ display: 'block', marginBottom: '8px' }}>Estado de APIs simuladas</strong>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '4px' }}>
              {Object.entries(apiStatus).map(([key, status]) => (
                <li key={key}>
                  {status.endpoint} → <strong>{status.state}</strong> ({status.records} registros)
                </li>
              ))}
            </ul>
          </section>
        )}

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px', color: '#94a3b8' }}>
            Cargando datos del sistema...
          </div>
        ) : (
          <>
            {currentView === 'books' && (
              <BookList
                filteredBooks={filteredBooks}
                getAuthorName={getAuthorName}
                getCategoryName={getCategoryName}
                onOpenDetails={openBookDetails}
              />
            )}

            {currentView === 'authors' && <AuthorList authors={authors} />}

            {currentView === 'categories' && <CategoryList categories={categories} />}

            {currentView === 'preferences' && <UserPreferencesPanel />}
          </>
        )}
      </div>

      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
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
              <button className="modal-close-icon" onClick={() => setIsAddBookModalOpen(false)}>
                ×
              </button>
            </div>

            <div className="modal-body-section">
              <BookForm
                onSubmit={handleCreateBookSubmit}
                onCancel={() => {
                  resetBookForm();
                  setIsAddBookModalOpen(false);
                }}
                authors={authors}
                categories={categories}
                formTitle={formTitle}
                setFormTitle={setFormTitle}
                formAuthorId={formAuthorId}
                setFormAuthorId={setFormAuthorId}
                formCategoryId={formCategoryId}
                setFormCategoryId={setFormCategoryId}
                formIsbn={formIsbn}
                setFormIsbn={setFormIsbn}
                formPages={formPages}
                setFormPages={setFormPages}
                formYear={formYear}
                setFormYear={setFormYear}
                formSummary={formSummary}
                setFormSummary={setFormSummary}
                formCoverUrl={formCoverUrl}
                setFormCoverUrl={setFormCoverUrl}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
