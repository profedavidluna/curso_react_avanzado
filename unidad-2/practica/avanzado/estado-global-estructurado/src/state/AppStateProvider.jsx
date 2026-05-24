import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { appReducer, initialState } from './reducer';

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setPriority = useCallback((priority) => {
    dispatch({ type: 'filters/priorityChanged', payload: priority });
  }, []);

  const setTicketsLoading = useCallback(() => {
    dispatch({ type: 'tickets/loading' });
  }, []);

  const setTicketsSuccess = useCallback((tickets) => {
    dispatch({ type: 'tickets/success', payload: tickets });
  }, []);

  const setTicketsError = useCallback((message) => {
    dispatch({ type: 'tickets/error', payload: message });
  }, []);

  const value = useMemo(
    () => ({
      state,
      actions: {
        setPriority,
        setTicketsLoading,
        setTicketsSuccess,
        setTicketsError,
      },
    }),
    [state, setPriority, setTicketsLoading, setTicketsSuccess, setTicketsError],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error('useAppState must be used inside AppStateProvider');
  }

  return context;
}
