import { useShallow } from 'zustand/react/shallow';
import { useAppStore } from '../store/appStore';

export function useApiData() {
  return useAppStore(useShallow((state) => ({
    books: state.books,
    authors: state.authors,
    categories: state.categories,
    isLoading: state.isLoading,
    apiStatus: state.apiStatus,
    addBook: state.addBook,
    initializeData: state.initializeData,
    cleanupInitializeData: state.cleanupInitializeData,
  })));
}
