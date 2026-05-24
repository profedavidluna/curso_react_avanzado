import { useMemo } from 'react';

export function useIncidentFilters(incidents, status) {
  return useMemo(() => {
    if (status === 'all') {
      return incidents;
    }

    return incidents.filter((incident) => incident.status === status);
  }, [incidents, status]);
}
