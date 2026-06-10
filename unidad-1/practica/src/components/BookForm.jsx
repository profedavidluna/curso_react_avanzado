// =====================================================================
// BUENAS PRÁCTICAS: useRef en formularios
//
// PROBLEMA ORIGINAL (legacy):
//   El formulario usaba 8 variables de estado controlado en App.jsx
//   (formTitle, formAuthorId, formIsbn, etc.). Cada pulsación de tecla
//   llamaba a un setter → re-render completo de <App> y todos sus hijos.
//
// SOLUCIÓN con useRef:
//   useRef permite acceder directamente al nodo del DOM sin disparar
//   ningún re-render. Ideal para formularios donde solo necesitamos
//   el valor en el momento del submit, no en cada pulsación.
//
// REGLA DE ORO:
//   Usa estado controlado (useState) cuando necesitas reaccionar a cada
//   cambio del input (validación en tiempo real, filtrado en vivo...).
//   Usa refs (useRef) cuando solo necesitas el valor al enviar el form.
// =====================================================================

import { useRef, useEffect } from 'react';

// ✅ La interfaz se simplifica drásticamente: solo onSubmit, onCancel,
//    authors y categories. Desaparecen los 16 props controlados.
export function BookForm({ onSubmit, onCancel, authors, categories }) {
  // ---------------------------------------------------------------
  // useRef EJEMPLO 1 – Formulario no controlado
  // Cada ref apunta directamente al nodo del DOM.
  // Escribir en los inputs NO provoca ningún re-render del componente.
  // ---------------------------------------------------------------
  const titleRef     = useRef(null);
  const authorIdRef  = useRef(null);
  const categoryIdRef = useRef(null);
  const isbnRef      = useRef(null);
  const pagesRef     = useRef(null);
  const yearRef      = useRef(null);
  const summaryRef   = useRef(null);
  const coverUrlRef  = useRef(null);

  // ---------------------------------------------------------------
  // useRef EJEMPLO 2 – Gestión del foco (manipulación del DOM)
  // useEffect + useRef permiten enfocar el primer campo en cuanto
  // el componente monta, sin necesidad de ningún estado externo.
  // ---------------------------------------------------------------
  useEffect(() => {
    // .focus() sobre el nodo real del DOM: cero re-renders, cero estado.
    titleRef.current?.focus();
  }, []); // [] → solo se ejecuta al montar, igual que componentDidMount

  const handleSubmit = (e) => {
    e.preventDefault();

    // Leemos los valores de los refs solo cuando el usuario hace submit.
    const title      = titleRef.current.value.trim();
    const authorId   = authorIdRef.current.value;
    const categoryId = categoryIdRef.current.value;

    if (!title || !authorId || !categoryId) {
      alert('Por favor, rellene los campos obligatorios (Título, Autor y Categoría)');
      return;
    }

    // Pasamos el objeto con los datos al padre.
    onSubmit({
      title,
      authorId,
      categoryId,
      isbn:     isbnRef.current.value.trim()     || 'N/A',
      pages:    parseInt(pagesRef.current.value) || 0,
      year:     parseInt(yearRef.current.value)  || new Date().getFullYear(),
      summary:  summaryRef.current.value.trim()  || 'Sin resumen disponible.',
      coverUrl: coverUrlRef.current.value.trim() ||
                'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80',
    });

    // Reseteamos el formulario de forma nativa; no hay estado que limpiar.
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>

      <div className="form-input-group">
        <label className="form-label-title">Título del Libro *</label>
        {/* ref conecta este nodo con titleRef; sin value/onChange → no controlado */}
        <input
          ref={titleRef}
          type="text"
          className="form-input-text"
          placeholder="Ej. Cien años de soledad"
        />
      </div>

      <div className="form-input-group">
        <label className="form-label-title">Autor *</label>
        <select ref={authorIdRef} className="form-select-box" defaultValue="">
          <option value="">Seleccione un autor...</option>
          {authors.map(a => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </div>

      <div className="form-input-group">
        <label className="form-label-title">Categoría *</label>
        <select ref={categoryIdRef} className="form-select-box" defaultValue="">
          <option value="">Seleccione una categoría...</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
        <div className="form-input-group">
          <label className="form-label-title">ISBN</label>
          <input ref={isbnRef} type="text" className="form-input-text" placeholder="Ej. 978-3-16..." />
        </div>
        <div className="form-input-group">
          <label className="form-label-title">Páginas</label>
          <input ref={pagesRef} type="number" className="form-input-text" placeholder="Ej. 350" />
        </div>
        <div className="form-input-group">
          <label className="form-label-title">Año</label>
          <input ref={yearRef} type="number" className="form-input-text" placeholder="Ej. 2026" />
        </div>
      </div>

      <div className="form-input-group">
        <label className="form-label-title">URL de Imagen de Portada</label>
        <input ref={coverUrlRef} type="text" className="form-input-text" placeholder="https://ejemplo.com/portada.jpg" />
      </div>

      <div className="form-input-group">
        <label className="form-label-title">Resumen / Descripción</label>
        <textarea ref={summaryRef} rows="3" className="form-textarea-field" placeholder="Escribe una breve sinopsis..." />
      </div>

      <div className="form-buttons-row">
        <button type="button" className="form-cancel-btn" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="form-submit-btn">Guardar Libro</button>
      </div>

    </form>
  );
}

export default BookForm;
