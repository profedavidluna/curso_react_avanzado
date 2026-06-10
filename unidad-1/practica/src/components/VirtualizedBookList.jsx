import { memo, useMemo, useState } from 'react';

// Altura fija aproximada de cada tarjeta. Esto nos permite calcular qué parte del listado
// corresponde al scroll actual sin renderizar todos los elementos.
const ITEM_HEIGHT = 182;
// Altura visible del contenedor donde se muestra la lista virtualizada.
const VIEWPORT_HEIGHT = 560;
// Extra de seguridad: renderizamos unas pocas filas antes y después de la zona visible
// para evitar que aparezcan cortes bruscos al hacer scroll.
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
    // start indica desde qué índice del array debemos empezar a mostrar tarjetas.
    // Lo calculamos usando la posición del scroll y la altura fija de cada item.
    const start = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN);
    // visibleCount es cuántas tarjetas caben aproximadamente en pantalla,
    // más un margen extra (overscan) para suavizar el desplazamiento.
    const visibleCount = Math.ceil(VIEWPORT_HEIGHT / ITEM_HEIGHT) + OVERSCAN * 2;
    const end = Math.min(books.length, start + visibleCount);

    return {
      // Solo nos quedamos con la “ventana” visible del listado.
      visibleBooks: books.slice(start, end),
      // offsetTop empuja el bloque visible hacia abajo para que parezca
      // que todo el listado está montado, aunque solo pintemos una parte.
      offsetTop: start * ITEM_HEIGHT,
      // totalHeight reserva el espacio completo del listado para que el scroll funcione bien.
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
          {/* Este contenedor interno simula el alto completo del listado.
              Lo que realmente pintamos es solo un bloque absoluto desplazado. */}
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
