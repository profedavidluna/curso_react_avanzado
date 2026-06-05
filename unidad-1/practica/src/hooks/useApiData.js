import { useContext } from 'react';
import { ApiDataContext } from '../contexts/apiDataContext';

export function useApiData() {
  const context = useContext(ApiDataContext);

  if (!context) {
    throw new Error('useApiData debe usarse dentro de ApiDataProvider');
  }

  return context;
}
