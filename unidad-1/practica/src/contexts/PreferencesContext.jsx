import { useMemo, useState } from 'react';
import { PreferencesContext } from './preferencesContext';

const initialPreferences = {
  theme: 'oscuro',
  language: 'es-CO',
  compactMode: false,
  showSuggestions: true,
};

export function PreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState(initialPreferences);

  const updatePreference = (key, value) => {
    setPreferences((previousPreferences) => ({
      ...previousPreferences,
      [key]: value,
    }));
  };

  const value = useMemo(
    () => ({
      preferences,
      updatePreference,
    }),
    [preferences],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}
