import React from 'react';
import BookCard from './BookCard';

export function BookList({ filteredBooks, getAuthorName, getCategoryName, onOpenDetails }) {
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
}

export default BookList;
