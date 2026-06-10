import { memo } from 'react';
import BookCard from './BookCard';

function BookListComponent({ filteredBooks, getAuthorName, getCategoryName, onOpenDetails }) {
  if (filteredBooks.length === 0) {
    return <div className="empty-data-alert">No se encontraron libros que coincidan con la búsqueda.</div>;
  }

  return (
    <>
      <div className="segmentation-hint">
        La búsqueda y el filtrado viven fuera de `App`; este bloque solo recibe datos listos para
        renderizar y queda aislado del resto de vistas.
      </div>
      <div className="books-grid-layout">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            getAuthorName={getAuthorName}
            getCategoryName={getCategoryName}
            onOpenDetails={onOpenDetails}
          />
        ))}
      </div>
    </>
  );
}

export const BookList = memo(BookListComponent);

export default BookList;
