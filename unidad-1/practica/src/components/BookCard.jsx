import { memo } from 'react';

function BookCardComponent({ book, getAuthorName, getCategoryName, onOpenDetails }) {
  return (
    <div className="book-card-item">
      <div className="book-card-image-wrapper">
        <img className="book-card-image" src={book.coverUrl} alt={book.title} />
        <span className="book-card-badge">{getCategoryName(book.categoryId)}</span>
      </div>
      <div className="book-card-info-content">
        <h3 className="book-card-title-text">{book.title}</h3>
        <p className="book-card-author-name">por {getAuthorName(book.authorId)}</p>
        <p className="book-card-description-summary">{book.summary}</p>
        <button 
          className="book-card-button-details"
          onClick={() => onOpenDetails(book)}
        >
          Ver Detalles
        </button>
      </div>
    </div>
  );
}

export default memo(BookCardComponent);
