import { useEffect, useMemo, useState } from 'react';
import { initialAuthors, initialBooks, initialCategories } from '../mockData';
import { ApiDataContext } from './apiDataContext';

export function ApiDataProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState({
    books: { endpoint: '/api/books', state: 'loading', records: 0 },
    authors: { endpoint: '/api/authors', state: 'loading', records: 0 },
    categories: { endpoint: '/api/categories', state: 'loading', records: 0 },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooks(initialBooks);
      setAuthors(initialAuthors);
      setCategories(initialCategories);
      setIsLoading(false);

      const loadedAt = new Date().toISOString();
      setApiStatus({
        books: { endpoint: '/api/books', state: 'loaded', records: initialBooks.length, loadedAt },
        authors: { endpoint: '/api/authors', state: 'loaded', records: initialAuthors.length, loadedAt },
        categories: { endpoint: '/api/categories', state: 'loaded', records: initialCategories.length, loadedAt },
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const addBook = (book) => {
    setBooks((previousBooks) => [book, ...previousBooks]);
    setApiStatus((previousStatus) => ({
      ...previousStatus,
      books: {
        ...previousStatus.books,
        state: 'loaded',
        records: previousStatus.books.records + 1,
        loadedAt: new Date().toISOString(),
      },
    }));
  };

  const value = useMemo(
    () => ({
      books,
      authors,
      categories,
      isLoading,
      apiStatus,
      addBook,
    }),
    [books, authors, categories, isLoading, apiStatus],
  );

  return <ApiDataContext.Provider value={value}>{children}</ApiDataContext.Provider>;
}
