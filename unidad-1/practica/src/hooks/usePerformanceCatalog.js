import { useMemo } from 'react';

// Multiplicamos el catálogo base para simular un escenario grande sin depender de una API real.
// La idea es que el ejemplo tenga suficientes filas como para que la virtualización se note.
const BOOK_MULTIPLIER = 240;

export function usePerformanceCatalog({ books, searchQuery, selectedCategoryFilter, sortBy }) {
  const largeCatalog = useMemo(() => {
    // Creamos 240 copias de cada libro del dataset base.
    // Cada copia recibe un id nuevo y un código de inventario distinto para que React pueda renderizarla
    // como un elemento independiente.
    return Array.from({ length: BOOK_MULTIPLIER }, (_, copyIndex) =>
      books.map((book) => ({
        ...book,
        id: `${book.id}__copy__${copyIndex + 1}`,
        inventoryCode: `BK-${String(copyIndex + 1).padStart(3, '0')}-${book.id.toUpperCase()}`,
      })),
    ).flat();
  }, [books]);

  const filteredBooks = useMemo(() => {
    // Normalizamos el texto para que la búsqueda no dependa de mayúsculas, minúsculas ni espacios extra.
    const normalizedQuery = searchQuery.toLowerCase().trim();

    // Primero filtramos el catálogo grande.
    // Después ordenamos el resultado para que la lista ya llegue lista para pintarse.
    const visibleBooks = largeCatalog.filter((book) => {
      const matchesSearch =
        normalizedQuery === '' ||
        book.title.toLowerCase().includes(normalizedQuery) ||
        book.isbn.includes(normalizedQuery) ||
        book.inventoryCode.toLowerCase().includes(normalizedQuery);
      const matchesCategory =
        selectedCategoryFilter === '' || book.categoryId === selectedCategoryFilter;

      return matchesSearch && matchesCategory;
    });

    return [...visibleBooks].sort((left, right) => {
      // El orden final también se memoriza: solo se recalcula si cambia el catálogo,
      // la búsqueda, el filtro o el criterio de orden.
      if (sortBy === 'year') {
        return right.year - left.year;
      }

      if (sortBy === 'pages') {
        return right.pages - left.pages;
      }

      return left.title.localeCompare(right.title, 'es');
    });
  }, [largeCatalog, searchQuery, selectedCategoryFilter, sortBy]);

  const stats = useMemo(
    () => ({
      // totalBooks muestra el tamaño real del dataset simulado.
      // filteredBooks muestra cuántos resultados quedan después de buscar, filtrar y ordenar.
      totalBooks: largeCatalog.length,
      filteredBooks: filteredBooks.length,
    }),
    [filteredBooks.length, largeCatalog.length],
  );

  return {
    filteredBooks,
    stats,
  };
}
