import { useState } from 'react';
import { useIncidentFilters } from '../hooks/useIncidentFilters';
import { getIncidents } from '../services/incidentRepository';

const incidents = getIncidents();

export function IncidentBoard() {
  const statusSelectId = 'incident-status';
  const [status, setStatus] = useState('all');
  const filteredIncidents = useIncidentFilters(incidents, status);

  return (
    <section>
      <label htmlFor={statusSelectId}>
        Estado
        <select
          id={statusSelectId}
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="all">Todos</option>
          <option value="open">Abiertos</option>
          <option value="resolved">Resueltos</option>
        </select>
      </label>

      <ul>
        {filteredIncidents.map((incident) => (
          <li key={incident.id}>
            <strong>{incident.title}</strong> · {incident.team} · {incident.status}
          </li>
        ))}
      </ul>
    </section>
  );
}
