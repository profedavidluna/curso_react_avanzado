// =====================================================================
// BUENAS PRÁCTICAS: React.memo + useCallback
//
// PROBLEMA ORIGINAL (legacy):
//   <BookCard> se re-renderizaba con CADA cambio de estado en <App>,
//   aunque book, getAuthorName, getCategoryName y onOpenDetails no
//   hubieran cambiado. Con 20 libros = 20 renders innecesarios.
//
// SOLUCIÓN:
//   React.memo hace que <BookCard> solo se re-renderice si alguna de
//   sus props cambia. Para que esto funcione, las funciones que se pasan
//   como props (getAuthorName, getCategoryName, onOpenDetails) deben ser
//   estables entre renders → por eso las envolvemos en useCallback en App.
//
//   React.memo + useCallback trabajan juntos:
//     • useCallback  → garantiza que la referencia de la función no cambia
//     • React.memo   → evita el re-render cuando las referencias son iguales
// =====================================================================

import React from 'react';

// ✅ React.memo memoriza el resultado del render.
//    Si todas las props son iguales (mismo objeto/función),
//    React reutiliza el JSX anterior sin ejecutar la función de render.
export const BookCard = React.memo(function BookCard({ book, getAuthorName, getCategoryName, onOpenDetails }) {
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
});

export default BookCard;
