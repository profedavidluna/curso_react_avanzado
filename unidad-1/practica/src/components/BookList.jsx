import React from 'react';
import BookCard from './BookCard';

// React.memo: si filteredBooks, getAuthorName, getCategoryName y onOpenDetails
// no cambian entre renders, BookList (y todos sus BookCard hijos) se saltan.
export const BookList = React.memo(function BookList({ filteredBooks, getAuthorName, getCategoryName, onOpenDetails }) {
  if (filteredBooks.length === 0) {
    return <div className="empty-data-alert">No se encontraron libros que coincidan con la búsqueda.</div>;
  }

  return (
    <div className="books-grid-layout">
      {filteredBooks.map(book => (
        <BookCard
          key={book.id}
          book={book}
          getAuthorName={getAuthorName}
          getCategoryName={getCategoryName}
          onOpenDetails={onOpenDetails}
        />
      ))}
    </div>
  );
});

export default BookList;
