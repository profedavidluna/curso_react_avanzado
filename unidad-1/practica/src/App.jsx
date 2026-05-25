import { useState, useEffect } from 'react';
import { initialBooks, initialAuthors, initialCategories } from './mockData';
import Sidebar from './commons/componentes/Sidebar';
import Header from './commons/componentes/Header';
import { BookList, BookForm } from './features/books/';
import { AuthorList } from './features/autores';
import {CategoryList} from './features/categorias';
import Modal from './commons/componentes/Modal';

function App() {
  // --- ESTADOS GLOBALES DE LA APP (MONOLITO) ---
  const [currentView, setCurrentView] = useState('books'); // 'books', 'authors', 'categories'
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- ESTADOS DE FILTRADO Y BÚSQUEDA ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');

  // --- ESTADOS DE MODALES ---
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedBookForDetail, setSelectedBookForDetail] = useState(null);
  const [activeDetailTab, setActiveDetailTab] = useState('info'); // 'info', 'reviews', 'loans'

  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

  // --- ESTADOS CONTROLADOS DEL FORMULARIO DE CREACIÓN DE LIBROS (Ineficiente, re-renderiza toda la App en cada pulsación) ---
  const [formTitle, setFormTitle] = useState('');
  const [formAuthorId, setFormAuthorId] = useState('');
  const [formCategoryId, setFormCategoryId] = useState('');
  const [formIsbn, setFormIsbn] = useState('');
  const [formPages, setFormPages] = useState('');
  const [formYear, setFormYear] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formCoverUrl, setFormCoverUrl] = useState('');

  // Simulación de carga de datos iniciales
  useEffect(() => {
    const timer = setTimeout(() => {
      setBooks(initialBooks);
      setAuthors(initialAuthors);
      setCategories(initialCategories);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // --- LÓGICA DE FILTRADO DIRECTA EN RENDER (Re-calculado en cada render de la App) ---
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.isbn.includes(searchQuery);
    const matchesCategory = selectedCategoryFilter === '' || book.categoryId === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Manejo de la creación del libro
  const handleCreateBookSubmit = (e) => {
    e.preventDefault();
    
    if (!formTitle || !formAuthorId || !formCategoryId) {
      alert('Por favor, rellene los campos obligatorios (Título, Autor y Categoría)');
      return;
    }

    const newBook = {
      id: `b${Date.now()}`,
      title: formTitle,
      authorId: formAuthorId,
      categoryId: formCategoryId,
      isbn: formIsbn || "N/A",
      pages: parseInt(formPages) || 0,
      year: parseInt(formYear) || new Date().getFullYear(),
      summary: formSummary || "Sin resumen disponible.",
      coverUrl: formCoverUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80",
      reviews: [],
      loans: []
    };

    setBooks([newBook, ...books]);
    resetBookForm();
    setIsAddBookModalOpen(false);
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

  // Abrir Modal de Detalle
  const openBookDetails = (book) => {
    setSelectedBookForDetail(book);
    setActiveDetailTab('info');
    setIsDetailModalOpen(true);
  };

  // Obtener nombre del autor por ID
  const getAuthorName = (authorId) => {
    const author = authors.find(a => a.id === authorId);
    return author ? author.name : 'Autor Desconocido';
  };

  // Obtener categoría por ID
  const getCategoryName = (catId) => {
    const category = categories.find(c => c.id === catId);
    return category ? category.name : 'Sin Categoría';
  };

  return (
    <div>
      {/* --- SIDEBAR LATERAL (PROP DRILLING) --- */}
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
      />

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="main-wrapper">
        
        {/* --- CABECERA DE LA PÁGINA (PROP DRILLING DEL BUSCADOR ACOPLADO) --- */}
        <Header 
          currentView={currentView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategoryFilter={selectedCategoryFilter}
          setSelectedCategoryFilter={setSelectedCategoryFilter}
          categories={categories}
          onAddBookClick={() => setIsAddBookOpen(true)}
        />

        {/* --- VISTA DE CARGA --- */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px', color: '#94a3b8' }}>
            Cargando datos del sistema...
          </div>
        ) : (
          <>
            {/* --- SECCIÓN 1: VISTA DE LIBROS (PROP DRILLING) --- */}
            {currentView === 'books' && (
              <BookList 
                filteredBooks={filteredBooks}
                getAuthorName={getAuthorName}
                getCategoryName={getCategoryName}
                onOpenDetails={openBookDetails}
              />
            )}

            {/* --- SECCIÓN 2: VISTA DE AUTORES (PROP DRILLING) --- */}
            {currentView === 'authors' && (
              <AuthorList authors={authors} />
            )}

            {/* --- SECCIÓN 3: VISTA DE CATEGORÍAS (PROP DRILLING) --- */}
            {currentView === 'categories' && (
              <CategoryList categories={categories} />
            )}
          </>
        )}
      </div>

      {/* =======================================================
          MODAL DE DETALLES DEL LIBRO (PROP DRILLING MASSIVE & RIGID)
          ======================================================= */}
      <Modal 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        book={selectedBookForDetail}
        getAuthorName={getAuthorName}
        getCategoryName={getCategoryName}
        activeDetailTab={activeDetailTab}
        setActiveDetailTab={setActiveDetailTab}
      />

      {/* =======================================================
          MODAL CON FORMULARIO DE NUEVO LIBRO (PROP DRILLING BRUTAL)
          ======================================================= */}
      {isAddBookModalOpen && (
        <div className="modal-overlay-bg" onClick={() => setIsAddBookModalOpen(false)}>
          <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header-section">
              <h2 className="modal-title-text">Registrar Nuevo Libro</h2>
              <button className="modal-close-icon" onClick={() => setIsAddBookModalOpen(false)}>×</button>
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
