import React from 'react';

export function BookForm({
  onSubmit,
  onCancel,
  authors,
  categories,
  formTitle,
  setFormTitle,
  formAuthorId,
  setFormAuthorId,
  formCategoryId,
  setFormCategoryId,
  formIsbn,
  setFormIsbn,
  formPages,
  setFormPages,
  formYear,
  setFormYear,
  formSummary,
  setFormSummary,
  formCoverUrl,
  setFormCoverUrl
}) {
  return (
    <form onSubmit={onSubmit}>
      
      <div className="form-input-group">
        <label className="form-label-title">Título del Libro *</label>
        <input 
          type="text" 
          className="form-input-text" 
          placeholder="Ej. Cien años de soledad" 
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
        />
      </div>

      <div className="form-input-group">
        <label className="form-label-title">Autor *</label>
        <select 
          className="form-select-box"
          value={formAuthorId}
          onChange={(e) => setFormAuthorId(e.target.value)}
        >
          <option value="">Seleccione un autor...</option>
          {authors.map(a => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </div>

      <div className="form-input-group">
        <label className="form-label-title">Categoría *</label>
        <select 
          className="form-select-box"
          value={formCategoryId}
          onChange={(e) => setFormCategoryId(e.target.value)}
        >
          <option value="">Seleccione una categoría...</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
        <div className="form-input-group">
          <label className="form-label-title">ISBN</label>
          <input 
            type="text" 
            className="form-input-text" 
            placeholder="Ej. 978-3-16..." 
            value={formIsbn}
            onChange={(e) => setFormIsbn(e.target.value)}
          />
        </div>
        <div className="form-input-group">
          <label className="form-label-title">Páginas</label>
          <input 
            type="number" 
            className="form-input-text" 
            placeholder="Ej. 350" 
            value={formPages}
            onChange={(e) => setFormPages(e.target.value)}
          />
        </div>
        <div className="form-input-group">
          <label className="form-label-title">Año</label>
          <input 
            type="number" 
            className="form-input-text" 
            placeholder="Ej. 2026" 
            value={formYear}
            onChange={(e) => setFormYear(e.target.value)}
          />
        </div>
      </div>

      <div className="form-input-group">
        <label className="form-label-title">URL de Imagen de Portada</label>
        <input 
          type="text" 
          className="form-input-text" 
          placeholder="https://ejemplo.com/portada.jpg" 
          value={formCoverUrl}
          onChange={(e) => setFormCoverUrl(e.target.value)}
        />
      </div>

      <div className="form-input-group">
        <label className="form-label-title">Resumen / Descripción</label>
        <textarea 
          rows="3" 
          className="form-textarea-field" 
          placeholder="Escribe una breve sinopsis..." 
          value={formSummary}
          onChange={(e) => setFormSummary(e.target.value)}
        />
      </div>

      <div className="form-buttons-row">
        <button 
          type="button" 
          className="form-cancel-btn" 
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button type="submit" className="form-submit-btn">Guardar Libro</button>
      </div>

    </form>
  );
}

export default BookForm;
