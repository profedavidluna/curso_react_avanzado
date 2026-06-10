import { useState } from 'react';

const INITIAL_FORM_STATE = {
  title: '',
  authorId: '',
  categoryId: '',
  isbn: '',
  pages: '',
  year: '',
  summary: '',
  coverUrl: '',
};

export function BookForm({ onSubmit, onCancel, authors, categories }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errorMessage, setErrorMessage] = useState('');

  const updateField = (field) => (event) => {
    const value = event.target.value;
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrorMessage('');
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedAuthorId = formData.authorId.trim();
    const normalizedCategoryId = formData.categoryId.trim();

    if (!formData.title.trim() || !normalizedAuthorId || !normalizedCategoryId) {
      setErrorMessage('Complete título, autor y categoría antes de guardar.');
      return;
    }

    const submitSucceeded = onSubmit({
      ...formData,
      authorId: normalizedAuthorId,
      categoryId: normalizedCategoryId,
    });

    if (submitSucceeded) {
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="segmentation-hint">
        El estado del formulario vive dentro del modal: escribir aquí ya no re-renderiza toda la
        aplicación.
      </div>

      {errorMessage && <div className="empty-data-alert">{errorMessage}</div>}

      <div className="form-input-group">
        <label className="form-label-title">Título del Libro *</label>
        <input 
          type="text" 
          className="form-input-text" 
          placeholder="Ej. Cien años de soledad" 
          value={formData.title}
          onChange={updateField('title')}
        />
      </div>

      <div className="form-input-group">
        <label className="form-label-title">Autor *</label>
        <select 
          className="form-select-box"
          value={formData.authorId}
          onChange={updateField('authorId')}
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
          value={formData.categoryId}
          onChange={updateField('categoryId')}
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
            value={formData.isbn}
            onChange={updateField('isbn')}
          />
        </div>
        <div className="form-input-group">
          <label className="form-label-title">Páginas</label>
          <input 
            type="number" 
            className="form-input-text" 
            placeholder="Ej. 350" 
            value={formData.pages}
            onChange={updateField('pages')}
          />
        </div>
        <div className="form-input-group">
          <label className="form-label-title">Año</label>
          <input 
            type="number" 
            className="form-input-text" 
            placeholder="Ej. 2026" 
            value={formData.year}
            onChange={updateField('year')}
          />
        </div>
      </div>

      <div className="form-input-group">
        <label className="form-label-title">URL de Imagen de Portada</label>
        <input 
          type="text" 
          className="form-input-text" 
          placeholder="https://ejemplo.com/portada.jpg" 
          value={formData.coverUrl}
          onChange={updateField('coverUrl')}
        />
      </div>

      <div className="form-input-group">
        <label className="form-label-title">Resumen / Descripción</label>
        <textarea 
          rows="3" 
          className="form-textarea-field" 
          placeholder="Escribe una breve sinopsis..." 
          value={formData.summary}
          onChange={updateField('summary')}
        />
      </div>

      <div className="form-buttons-row">
        <button 
          type="button" 
          className="form-cancel-btn" 
          onClick={handleCancel}
        >
          Cancelar
        </button>
        <button type="submit" className="form-submit-btn">Guardar Libro</button>
      </div>

    </form>
  );
}

export default BookForm;
