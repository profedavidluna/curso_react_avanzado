
import { create } from 'zustand';

export const useTestStore = create((set) => ({
  theme: 'oscuro',
  language: 'es-CO',
  compactMode: false,
  showSuggestions: true,

  updatePreference: (key, value) => set({ [key]: value }),
}));
