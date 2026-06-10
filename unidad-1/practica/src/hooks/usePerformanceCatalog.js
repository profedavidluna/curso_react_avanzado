import { useMemo } from 'react';

// 240 copias generan un dataset suficientemente grande para notar el valor de la virtualización
// sin volver la demo incómoda durante clase o revisión manual.
const BOOK_MULTIPLIER = 240;

export function usePerformanceCatalog({ books, searchQuery, selectedCategoryFilter, sortBy }) {
  const largeCatalog = useMemo(() => {
    return Array.from({ length: BOOK_MULTIPLIER }, (_, copyIndex) =>
      books.map((book) => ({
        ...book,
        id: `${book.id}__copy__${copyIndex + 1}`,
        inventoryCode: `BK-${String(copyIndex + 1).padStart(3, '0')}-${book.id.toUpperCase()}`,
      })),
    ).flat();
  }, [books]);

  const filteredBooks = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase().trim();

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
