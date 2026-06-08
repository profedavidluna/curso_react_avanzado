import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useTestStore } from '../store/testStore';

export function usePreferences() {
  const { theme, language, compactMode, showSuggestions, updatePreference } = useTestStore(
    useShallow((state) => ({
      theme: state.theme,
      language: state.language,
      compactMode: state.compactMode,
      showSuggestions: state.showSuggestions,
      updatePreference: state.updatePreference,
    }))
  );

  const preferences = useMemo(
    () => ({
      theme,
      language,
      compactMode,
      showSuggestions,
    }),
    [theme, language, compactMode, showSuggestions]
  );

  return { preferences, updatePreference };
}
