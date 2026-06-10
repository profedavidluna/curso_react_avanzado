// =====================================================================
// BUENAS PRÁCTICAS: useCallback en el componente raíz
//
// PROBLEMA ORIGINAL (legacy):
//   • 8 variables de estado controlaban el formulario → re-render de
//     toda la App en cada pulsación de tecla.
//   • getAuthorName, getCategoryName y openBookDetails se redefinían
//     en cada render → React.memo en BookCard no podía optimizar nada
//     porque siempre recibía funciones "nuevas".
//   • setSearchQuery se pasaba directamente → el filtro se recalculaba
//     en cada tecla, sin ninguna protección de rendimiento.
//   • Bug: onAddBookClick llamaba a setIsAddBookOpen (función inexistente).
//
// SOLUCIONES aplicadas:
//   ✅ useRef Ejemplos 1 y 2 → en BookForm.jsx
//   ✅ useCallback Ejemplo 1 → getAuthorName, getCategoryName, openBookDetails
//   ✅ useCallback Ejemplo 2 → handleSearchChange (se combina con debounce en Header)
//   ✅ React.memo            → BookCard y BookList
//   ✅ Bug fix               → setIsAddBookModalOpen (nombre correcto)
// =====================================================================

import { useState, useEffect, useCallback, useMemo } from 'react';
import { initialBooks, initialAuthors, initialCategories } from './mockData';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BookList from './components/BookList';
import AuthorList from './components/AuthorList';
import CategoryList from './components/CategoryList';
import Modal from './components/Modal';
import BookForm from './components/BookForm';

function App() {
  // --- ESTADOS GLOBALES ---
  const [currentView, setCurrentView] = useState('books');
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
  const [activeDetailTab, setActiveDetailTab] = useState('info');
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

  // ✅ ELIMINADOS: los 8 estados de formulario controlado.
  //    Ahora BookForm gestiona sus propios valores con useRef internamente.

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

  // useMemo: el filtrado solo se recalcula cuando books, searchQuery o
  // selectedCategoryFilter cambian, no en cada render de App.
  const filteredBooks = useMemo(() => books.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);
    const matchesCategory =
      selectedCategoryFilter === '' || book.categoryId === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  }), [books, searchQuery, selectedCategoryFilter]);

  // ---------------------------------------------------------------
  // useCallback EJEMPLO 1 – Estabilizar funciones de lookup
  //
  // Sin useCallback: en cada render de App se crea una nueva referencia
  // de getAuthorName y getCategoryName → BookCard (aunque use React.memo)
  // se re-renderiza porque recibe "props nuevas".
  //
  // Con useCallback + deps: la misma referencia se reutiliza mientras
  // authors/categories no cambien → React.memo en BookCard puede optimizar.
  // ---------------------------------------------------------------
  const getAuthorName = useCallback((authorId) => {
    const author = authors.find(a => a.id === authorId);
    return author ? author.name : 'Autor Desconocido';
  }, [authors]); // ← se recrea solo cuando cambia el array de autores

  const getCategoryName = useCallback((catId) => {
    const category = categories.find(c => c.id === catId);
    return category ? category.name : 'Sin Categoría';
  }, [categories]); // ← se recrea solo cuando cambia el array de categorías

  // openBookDetails solo usa setters de useState, que son estables ([] de deps)
  const openBookDetails = useCallback((book) => {
    setSelectedBookForDetail(book);
    setActiveDetailTab('info');
    setIsDetailModalOpen(true);
  }, []); // los setters de useState son estables: no necesitamos deps

  // ---------------------------------------------------------------
  // useCallback EJEMPLO 2 – Handler estable para el buscador
  //
  // handleSearchChange actualiza searchQuery. Al envolverlo en useCallback
  // con [] de deps, la referencia es SIEMPRE la misma entre renders.
  // Header.jsx usará esta referencia estable como dependencia de su propio
  // useCallback de debounce → cadena completa de estabilidad.
  // ---------------------------------------------------------------
  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
  }, []); // setSearchQuery es estable → deps vacías

  // ✅ handleCreateBookSubmit ahora recibe el objeto del form (desde BookForm con refs)
  //    en lugar de leer 8 variables de estado.
  const handleCreateBookSubmit = useCallback((bookData) => {
    const newBook = {
      id: `b${Date.now()}`,
      ...bookData,
      reviews: [],
      loans: [],
    };
    setBooks(prev => [newBook, ...prev]);
    setIsAddBookModalOpen(false);
  }, []); // solo usa setters estables

  return (
    <div>
      {/* --- SIDEBAR LATERAL --- */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="main-wrapper">

        {/* ✅ onSearchChange en lugar de searchQuery + setSearchQuery
               Header gestiona el debounce internamente (ver Header.jsx) */}
        <Header
          currentView={currentView}
          onSearchChange={handleSearchChange}
          selectedCategoryFilter={selectedCategoryFilter}
          setSelectedCategoryFilter={setSelectedCategoryFilter}
          categories={categories}
          onAddBookClick={() => setIsAddBookModalOpen(true)} // ✅ bug fix
        />

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px', color: '#94a3b8' }}>
            Cargando datos del sistema...
          </div>
        ) : (
          <>
            {currentView === 'books' && (
              /* ✅ getAuthorName, getCategoryName y openBookDetails son referencias
                    estables gracias a useCallback → BookList y BookCard (React.memo)
                    NO se re-renderizarán al cambiar otros estados de App */
              <BookList
                filteredBooks={filteredBooks}
                getAuthorName={getAuthorName}
                getCategoryName={getCategoryName}
                onOpenDetails={openBookDetails}
              />
            )}

            {currentView === 'authors' && (
              <AuthorList authors={authors} />
            )}

            {currentView === 'categories' && (
              <CategoryList categories={categories} />
            )}
          </>
        )}
      </div>

      {/* --- MODAL DE DETALLES DEL LIBRO --- */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        book={selectedBookForDetail}
        getAuthorName={getAuthorName}
        getCategoryName={getCategoryName}
        activeDetailTab={activeDetailTab}
        setActiveDetailTab={setActiveDetailTab}
      />

      {/* --- MODAL CON FORMULARIO DE NUEVO LIBRO --- */}
      {isAddBookModalOpen && (
        <div className="modal-overlay-bg" onClick={() => setIsAddBookModalOpen(false)}>
          <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>

            <div className="modal-header-section">
              <h2 className="modal-title-text">Registrar Nuevo Libro</h2>
              <button className="modal-close-icon" onClick={() => setIsAddBookModalOpen(false)}>×</button>
            </div>

            <div className="modal-body-section">
              {/* ✅ BookForm ya no recibe 16 props de estado controlado.
                     Solo onSubmit, onCancel, authors y categories.
                     El auto-focus y la recogida de datos con refs es
                     responsabilidad del propio BookForm. */}
              <BookForm
                onSubmit={handleCreateBookSubmit}
                onCancel={() => setIsAddBookModalOpen(false)}
                authors={authors}
                categories={categories}
              />
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
