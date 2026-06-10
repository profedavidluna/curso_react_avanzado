
export function Modal({ 
  isOpen, 
  onClose, 
  book, 
  getAuthorName, 
  getCategoryName, 
  activeDetailTab, 
  setActiveDetailTab 
}) {
  if (!isOpen || !book) return null;

  return (
    <div className="modal-overlay-bg" onClick={onClose}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header-section">
          <h2 className="modal-title-text">{book.title}</h2>
          <button className="modal-close-icon" onClick={onClose}>×</button>
        </div>

        <div className="modal-body-section">
          {/* Navegación rígida de pestañas */}
          <div className="legacy-tabs-nav">
            <button 
              className={`legacy-tab-button ${activeDetailTab === 'info' ? 'legacy-tab-button-active' : ''}`}
              onClick={() => setActiveDetailTab('info')}
            >
              Información
            </button>
            <button 
              className={`legacy-tab-button ${activeDetailTab === 'reviews' ? 'legacy-tab-button-active' : ''}`}
              onClick={() => setActiveDetailTab('reviews')}
            >
              Reseñas ({book.reviews.length})
            </button>
            <button 
              className={`legacy-tab-button ${activeDetailTab === 'loans' ? 'legacy-tab-button-active' : ''}`}
              onClick={() => setActiveDetailTab('loans')}
            >
              Préstamos ({book.loans.length})
            </button>
          </div>

          {/* Contenido Pestañas */}
          {activeDetailTab === 'info' && (
            <div className="tab-content-container">
              <div className="book-detail-grid">
                <img className="book-detail-img" src={book.coverUrl} alt={book.title} />
                <div className="book-info-list">
                  <p><span>Autor:</span> {getAuthorName(book.authorId)}</p>
                  <p><span>Categoría:</span> {getCategoryName(book.categoryId)}</p>
                  <p><span>ISBN:</span> {book.isbn}</p>
                  <p><span>Páginas:</span> {book.pages}</p>
                  <p><span>Año Publicación:</span> {book.year}</p>
                  <p style={{ marginTop: '10px', lineHeight: '1.4' }}>{book.summary}</p>
                </div>
              </div>
            </div>
          )}

          {activeDetailTab === 'reviews' && (
            <div className="tab-content-container">
              {book.reviews.length === 0 ? (
                <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>Este libro no tiene reseñas aún.</p>
              ) : (
                book.reviews.map(review => (
                  <div className="review-item-card" key={review.id}>
                    <div className="review-user-name">{review.user}</div>
                    <div className="review-stars">
                      {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </div>
                    <div className="review-text">"{review.comment}"</div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeDetailTab === 'loans' && (
            <div className="tab-content-container">
              {book.loans.length === 0 ? (
                <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>Este libro no registra historial de préstamos.</p>
              ) : (
                book.loans.map(loan => (
                  <div className="loan-item-card" key={loan.id}>
                    <div className="loan-user-name">{loan.user}</div>
                    <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
                      Período: {loan.startDate} al {loan.endDate}
                    </div>
                    <span className={`loan-status-tag ${loan.status === 'returned' ? 'loan-status-returned' : 'loan-status-active'}`}>
                      {loan.status === 'returned' ? 'Devuelto' : 'Préstamo Activo'}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Modal;
