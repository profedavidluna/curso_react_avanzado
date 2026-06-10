import { useMemo } from 'react';

// Buena práctica: lógica de filtrado y orden encapsulada en un hook.
// El componente que la consume no necesita saber cómo funciona;
// solo recibe la lista resultante y sus dependencias son explícitas.
export function useFilteredIncidents(incidents, { search, sortOrder }) {
  return useMemo(() => {
    const term = search.toLowerCase().trim();

    const filtered = term
      ? incidents.filter((incident) => incident.title.toLowerCase().includes(term))
      : incidents;

    return [...filtered].sort((a, b) =>
      sortOrder === 'asc' ? a.timestamp - b.timestamp : b.timestamp - a.timestamp,
    );
  }, [incidents, search, sortOrder]);
}
