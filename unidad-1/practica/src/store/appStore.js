import { create } from 'zustand';
import { initialAuthors, initialBooks, initialCategories } from '../mockData';

const initialPreferences = {
  theme: 'oscuro',
  language: 'es-CO',
  compactMode: false,
  showSuggestions: true,
};

const initialFormState = {
  formTitle: '',
  formAuthorId: '',
  formCategoryId: '',
  formIsbn: '',
  formPages: '',
  formYear: '',
  formSummary: '',
  formCoverUrl: '',
};

const initialApiStatus = {
  books: { endpoint: '/api/books', state: 'loading', records: 0 },
  authors: { endpoint: '/api/authors', state: 'loading', records: 0 },
  categories: { endpoint: '/api/categories', state: 'loading', records: 0 },
};

export const useAppStore = create((set, get) => ({
  books: [],
  authors: [],
  categories: [],
  isLoading: true,
  isInitializing: false,
  apiStatus: initialApiStatus,
  isDataInitialized: false,
  initializationTimerId: null,
  preferences: initialPreferences,
  currentView: 'books',
  searchQuery: '',
  selectedCategoryFilter: '',
  isDetailModalOpen: false,
  selectedBookForDetail: null,
  activeDetailTab: 'info',
  isAddBookModalOpen: false,
  ...initialFormState,

  initializeData: () => {
    const { isDataInitialized, isInitializing } = get();
    if (isDataInitialized || isInitializing) return;

    set({ isInitializing: true });

    const timerId = setTimeout(() => {
      const loadedAt = new Date().toISOString();
      set({
        books: initialBooks,
        authors: initialAuthors,
        categories: initialCategories,
        isLoading: false,
        isInitializing: false,
        isDataInitialized: true,
        initializationTimerId: null,
        apiStatus: {
          books: { endpoint: '/api/books', state: 'loaded', records: initialBooks.length, loadedAt },
          authors: { endpoint: '/api/authors', state: 'loaded', records: initialAuthors.length, loadedAt },
          categories: {
            endpoint: '/api/categories',
            state: 'loaded',
            records: initialCategories.length,
            loadedAt,
          },
        },
      });
    }, 800);

    set({ initializationTimerId: timerId });
  },

  cleanupInitializeData: () => {
    const { initializationTimerId } = get();
    if (initializationTimerId === null) return;
    clearTimeout(initializationTimerId);
    set({ initializationTimerId: null, isInitializing: false });
  },

  addBook: (book) =>
    set((state) => ({
      books: [book, ...state.books],
      apiStatus: {
        ...state.apiStatus,
        books: {
          ...state.apiStatus.books,
          state: 'loaded',
          records: state.apiStatus.books.records + 1,
          loadedAt: new Date().toISOString(),
        },
      },
    })),

  updatePreference: (key, value) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        [key]: value,
      },
    })),

  setCurrentView: (currentView) => set({ currentView }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategoryFilter: (selectedCategoryFilter) => set({ selectedCategoryFilter }),
  openBookDetails: (book) => set({ selectedBookForDetail: book, activeDetailTab: 'info', isDetailModalOpen: true }),
  closeBookDetails: () => set({ isDetailModalOpen: false }),
  setActiveDetailTab: (activeDetailTab) => set({ activeDetailTab }),
  openAddBookModal: () => set({ isAddBookModalOpen: true }),
  closeAddBookModal: () => set({ isAddBookModalOpen: false }),
  setFormField: (field, value) => set({ [field]: value }),
  resetBookForm: () => set({ ...initialFormState }),
}));
