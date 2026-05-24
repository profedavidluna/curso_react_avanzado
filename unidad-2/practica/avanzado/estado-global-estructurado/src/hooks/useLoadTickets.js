import { useEffect } from 'react';

const mockTickets = [
  { id: 1, title: 'Error de autenticación SSO', priority: 'high' },
  { id: 2, title: 'Ajuste de layout en reportes', priority: 'medium' },
  { id: 3, title: 'Actualizar documentación API', priority: 'low' },
];

export function useLoadTickets(actions) {
  useEffect(() => {
    let cancelled = false;

    actions.setTicketsLoading();

    const timeoutId = setTimeout(() => {
      if (cancelled) {
        return;
      }

      const shouldFail = false;

      if (shouldFail) {
        actions.setTicketsError('No fue posible cargar los tickets.');
        return;
      }

      actions.setTicketsSuccess(mockTickets);
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [actions]);
}
