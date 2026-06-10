import { memo, useMemo, useState } from 'react';

const ITEM_HEIGHT = 182;
const VIEWPORT_HEIGHT = 560;
const OVERSCAN = 2;

function VirtualizedBookRowComponent({ book, getAuthorName, getCategoryName, onOpenDetails }) {
  return (
    <article className="virtualized-book-card">
      <img className="virtualized-book-cover" src={book.coverUrl} alt={book.title} />
      <div className="virtualized-book-content">
        <div className="virtualized-book-meta">
          <span>{getCategoryName(book.categoryId)}</span>
          <span>{book.inventoryCode}</span>
        </div>
        <h3>{book.title}</h3>
        <p>por {getAuthorName(book.authorId)}</p>
        <p className="virtualized-book-summary">{book.summary}</p>
        <button className="book-card-button-details" onClick={() => onOpenDetails(book)}>
          Ver detalles
        </button>
      </div>
    </article>
  );
}

const VirtualizedBookRow = memo(VirtualizedBookRowComponent);

function VirtualizedBookListComponent({
  books,
  getAuthorName,
  getCategoryName,
  onOpenDetails,
}) {
  const [scrollTop, setScrollTop] = useState(0);

  const { visibleBooks, offsetTop, totalHeight } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN);
    const visibleCount = Math.ceil(VIEWPORT_HEIGHT / ITEM_HEIGHT) + OVERSCAN * 2;
    const end = Math.min(books.length, start + visibleCount);

    return {
      visibleBooks: books.slice(start, end),
      offsetTop: start * ITEM_HEIGHT,
      totalHeight: books.length * ITEM_HEIGHT,
    };
  }, [books, scrollTop]);

  if (books.length === 0) {
    return <div className="empty-data-alert">No hay libros para virtualizar con los filtros actuales.</div>;
  }

  return (
    <section className="virtualized-list-section">
      <div className="segmentation-hint">
        Virtualización activa: se renderizan <strong>{visibleBooks.length}</strong> tarjetas en DOM
        de <strong>{books.length}</strong> resultados.
      </div>

      <div
        className="virtualized-list-viewport"
        onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div style={{ position: 'absolute', top: offsetTop, left: 0, right: 0 }}>
            {visibleBooks.map((book) => (
              <VirtualizedBookRow
                key={book.id}
                book={book}
                getAuthorName={getAuthorName}
                getCategoryName={getCategoryName}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(VirtualizedBookListComponent);
