import { useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BookList from './components/BookList';
import AuthorList from './components/AuthorList';
import CategoryList from './components/CategoryList';
import Modal from './components/Modal';
import BookForm from './components/BookForm';
import { UserPreferencesPanel } from './components/UserPreferencesPanel';
import { useApiData } from './hooks/useApiData';
import { useAppStore } from './store/appStore';

function App() {
  const { books, authors, categories, isLoading, apiStatus, addBook, initializeData } = useApiData();
  const {
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    isDetailModalOpen,
    selectedBookForDetail,
    activeDetailTab,
    setActiveDetailTab,
    isAddBookModalOpen,
    openAddBookModal,
    closeAddBookModal,
    openBookDetails,
    closeBookDetails,
    formTitle,
    formAuthorId,
    formCategoryId,
    formIsbn,
    formPages,
    formYear,
    formSummary,
    formCoverUrl,
    setFormField,
    resetBookForm,
  } = useAppStore((state) => ({
    currentView: state.currentView,
    setCurrentView: state.setCurrentView,
    searchQuery: state.searchQuery,
    setSearchQuery: state.setSearchQuery,
    selectedCategoryFilter: state.selectedCategoryFilter,
    setSelectedCategoryFilter: state.setSelectedCategoryFilter,
    isDetailModalOpen: state.isDetailModalOpen,
    selectedBookForDetail: state.selectedBookForDetail,
    activeDetailTab: state.activeDetailTab,
    setActiveDetailTab: state.setActiveDetailTab,
    isAddBookModalOpen: state.isAddBookModalOpen,
    openAddBookModal: state.openAddBookModal,
    closeAddBookModal: state.closeAddBookModal,
    openBookDetails: state.openBookDetails,
    closeBookDetails: state.closeBookDetails,
    formTitle: state.formTitle,
    formAuthorId: state.formAuthorId,
    formCategoryId: state.formCategoryId,
    formIsbn: state.formIsbn,
    formPages: state.formPages,
    formYear: state.formYear,
    formSummary: state.formSummary,
    formCoverUrl: state.formCoverUrl,
    setFormField: state.setFormField,
    resetBookForm: state.resetBookForm,
  }));

  useEffect(() => {
    initializeData();
  }, [initializeData]);

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
    closeAddBookModal();
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
          onAddBookClick={openAddBookModal}
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
        onClose={closeBookDetails}
        book={selectedBookForDetail}
        getAuthorName={getAuthorName}
        getCategoryName={getCategoryName}
        activeDetailTab={activeDetailTab}
        setActiveDetailTab={setActiveDetailTab}
      />

      {isAddBookModalOpen && (
        <div className="modal-overlay-bg" onClick={closeAddBookModal}>
          <div className="modal-content-box" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header-section">
              <h2 className="modal-title-text">Registrar Nuevo Libro</h2>
              <button className="modal-close-icon" onClick={closeAddBookModal}>
                ×
              </button>
            </div>

            <div className="modal-body-section">
              <BookForm
                onSubmit={handleCreateBookSubmit}
                onCancel={() => {
                  resetBookForm();
                  closeAddBookModal();
                }}
                authors={authors}
                categories={categories}
                formTitle={formTitle}
                setFormTitle={(value) => setFormField('formTitle', value)}
                formAuthorId={formAuthorId}
                setFormAuthorId={(value) => setFormField('formAuthorId', value)}
                formCategoryId={formCategoryId}
                setFormCategoryId={(value) => setFormField('formCategoryId', value)}
                formIsbn={formIsbn}
                setFormIsbn={(value) => setFormField('formIsbn', value)}
                formPages={formPages}
                setFormPages={(value) => setFormField('formPages', value)}
                formYear={formYear}
                setFormYear={(value) => setFormField('formYear', value)}
                formSummary={formSummary}
                setFormSummary={(value) => setFormField('formSummary', value)}
                formCoverUrl={formCoverUrl}
                setFormCoverUrl={(value) => setFormField('formCoverUrl', value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
