import { create } from 'zustand';

export const useApiStore = create((set, get) => ({
  categories: [],
  categoriesLoading: false,
  categoriesError: null,
  categoriesLoaded: false,

  fetchCategories: async (url = 'http://localhost:4000/categories') => {
    const { categoriesLoading, categoriesLoaded } = get();

    // Evita solicitudes duplicadas o refetch innecesario al rematar el mismo componente.
    if (categoriesLoading || categoriesLoaded) {
      return;
    }

    set({ categoriesLoading: true, categoriesError: null });

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
      }

      const data = await response.json();
      set({ categories: data, categoriesLoaded: true });
    } catch (error) {
      set({ categoriesError: error.message || 'Error cargando categorias' });
    } finally {
      set({ categoriesLoading: false });
    }
  },

  clearCategoriesCache: () =>
    set({
      categories: [],
      categoriesLoading: false,
      categoriesError: null,
      categoriesLoaded: false,
    }),
}));
