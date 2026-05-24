import { useMemo } from 'react';
import { useLoadTickets } from './hooks/useLoadTickets';
import { AppStateProvider, useAppState } from './state/AppStateProvider';

function TicketDashboard() {
  const { state, actions } = useAppState();

  useLoadTickets(actions);

  const filteredTickets = useMemo(() => {
    if (state.filters.priority === 'all') {
      return state.tickets;
    }

    return state.tickets.filter((ticket) => ticket.priority === state.filters.priority);
  }, [state.tickets, state.filters.priority]);

  const metrics = useMemo(
    () => ({
      total: state.tickets.length,
      high: state.tickets.filter((ticket) => ticket.priority === 'high').length,
    }),
    [state.tickets],
  );

  return (
    <main>
      <h1>Estado global estructurado</h1>

      <label htmlFor="priority">
        Prioridad
        <select
          id="priority"
          value={state.filters.priority}
          onChange={(event) => actions.setPriority(event.target.value)}
        >
          <option value="all">Todas</option>
          <option value="high">Alta</option>
          <option value="medium">Media</option>
          <option value="low">Baja</option>
        </select>
      </label>

      <p>Total tickets: {metrics.total}</p>
      <p>Tickets alta prioridad: {metrics.high}</p>

      {state.status === 'loading' && <p>Cargando tickets...</p>}
      {state.status === 'error' && <p>{state.error}</p>}

      <ul>
        {filteredTickets.map((ticket) => (
          <li key={ticket.id}>
            <strong>{ticket.title}</strong> · {ticket.priority}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <TicketDashboard />
    </AppStateProvider>
  );
}
