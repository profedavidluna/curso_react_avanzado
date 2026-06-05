import { useAppStore } from '../store/appStore';

export function usePreferences() {
  return useAppStore((state) => ({
    preferences: state.preferences,
    updatePreference: state.updatePreference,
  }));
}
