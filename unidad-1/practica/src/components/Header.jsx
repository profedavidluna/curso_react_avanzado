// =====================================================================
// BUENAS PRÁCTICAS: useCallback + useRef para búsqueda con debounce
//
// PROBLEMA ORIGINAL (legacy):
//   Cada pulsación de tecla en el buscador llamaba a setSearchQuery
//   directamente → re-render de <App> → re-cálculo del filtro de libros
//   → re-render de toda la lista. En una lista grande, esto es costoso.
//
// SOLUCIÓN con useCallback + useRef:
//   1. useRef almacena el ID del timer sin provocar re-renders.
//   2. useCallback memoriza el handler: misma referencia entre renders
//      → útil si pasamos handleInputChange como prop a un hijo (evita
//      que el hijo se re-renderice por recibir una nueva función).
//   3. Debounce: esperamos 300 ms desde la última pulsación antes de
//      propagar el valor al padre. El usuario ve la respuesta visual
//      inmediata (inputValue) pero el filtro real se dispara solo al
//      detenerse, ahorrando renders y cálculos.
//
// FLUJO:
//   Usuario escribe → setInputValue() (visual inmediato, local)
//                   → clearTimeout + setTimeout (debounce)
//                   → onSearchChange(value) tras 300 ms de silencio
// =====================================================================

import { useState, useCallback, useRef } from 'react';

export function Header({
  currentView,
  onSearchChange,          // ✅ en lugar de setSearchQuery; se llama con debounce
  selectedCategoryFilter,
  setSelectedCategoryFilter,
  categories,
  onAddBookClick
}) {
  // Estado LOCAL para el valor visible en el input (respuesta visual inmediata)
  const [inputValue, setInputValue] = useState('');

  // useRef guarda el ID del timer entre renders SIN provocar re-renders
  const debounceTimerRef = useRef(null);

  // Cleanup: cancelar el timer si el componente se desmonta antes de que dispare
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // ---------------------------------------------------------------
  // useCallback EJEMPLO 2 – Handler con debounce
  //
  // useCallback(fn, [deps]) devuelve la MISMA referencia de fn mientras
  // las deps no cambien. Aquí onSearchChange es la única dependencia:
  // si el padre la estabiliza con su propio useCallback, esta función
  // nunca se recreará → React.memo en un hipotético hijo funcionaría.
  // ---------------------------------------------------------------
  const handleInputChange = useCallback((e) => {
    const value = e.target.value;

    // 1. Actualización inmediata del estado visual (el input responde al instante)
    setInputValue(value);

    // 2. Cancelar el timer anterior para "reiniciar el reloj"
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 3. Programar la propagación al padre solo si el usuario deja de escribir
    debounceTimerRef.current = setTimeout(() => {
      onSearchChange(value);
    }, 300); // 300 ms es el umbral estándar para búsquedas en tiempo real
  }, [onSearchChange]); // ← si onSearchChange es estable, handleInputChange también lo es

  return (
    <div className="app-header">
      <div>
        <h1 className="app-title-main">
          {currentView === 'books'      && 'Catálogo de Libros'}
          {currentView === 'authors'    && 'Directorio de Autores'}
          {currentView === 'categories' && 'Categorías Literarias'}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '5px' }}>
          Gestión Avanzada del Sistema de Biblioteca
        </p>
      </div>

      {currentView === 'books' && (
        <div className="search-filter-box">
          {/* El input usa inputValue (local) para respuesta inmediata */}
          <input
            type="text"
            className="search-input-field"
            placeholder="Buscar por título o ISBN..."
            value={inputValue}
            onChange={handleInputChange}
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
          <button className="add-book-button-action" onClick={onAddBookClick}>
            + Nuevo Libro
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
