import { useCallback, useMemo, useState } from 'react';
import { IncidentFeed } from './components/IncidentFeed';
import { useFilteredIncidents } from './hooks/useFilteredIncidents';

function buildDataset(size) {
  const severities = ['alta', 'media', 'baja'];
  return Array.from({ length: size }, (_, index) => ({
    id: `inc-${index + 1}`,
    title: `Incidencia ${index + 1}`,
    severity: severities[index % severities.length],
    timestamp: Date.now() - index * 60_000,
  }));
}

const ALL_INCIDENTS = buildDataset(5000);

export default function App() {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  // Práctica 1: handlers estables para no romper memoización de IncidentFeed
  const handleSearchChange = useCallback((event) => setSearch(event.target.value), []);
  const handleSortChange = useCallback((event) => setSortOrder(event.target.value), []);

  // Práctica 2: lógica de filtrado/orden en hook, no en el componente
  const filteredIncidents = useFilteredIncidents(ALL_INCIDENTS, { search, sortOrder });

  // Práctica 3: derivar stats solo cuando cambia la lista filtrada
  const stats = useMemo(
    () => ({
      total: filteredIncidents.length,
      high: filteredIncidents.filter((i) => i.severity === 'alta').length,
    }),
    [filteredIncidents],
  );

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '1rem', maxWidth: 640 }}>
      <h1>Buenas prácticas de performance</h1>
      <p>
        Dataset: <strong>{ALL_INCIDENTS.length.toLocaleString()}</strong> incidencias · Mostrando:{' '}
        <strong>{stats.total.toLocaleString()}</strong> · Críticas:{' '}
        <strong>{stats.high}</strong>
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <label>
          Buscar
          <input
            value={search}
            onChange={handleSearchChange}
            placeholder="Nombre de incidencia…"
            style={{ marginLeft: '0.5rem' }}
          />
        </label>

        <label>
          Orden
          <select value={sortOrder} onChange={handleSortChange} style={{ marginLeft: '0.5rem' }}>
            <option value="desc">Más reciente primero</option>
            <option value="asc">Más antiguo primero</option>
          </select>
        </label>
      </div>

      {/* Práctica 4: el feed está memoizado y virtualizado */}
      <IncidentFeed incidents={filteredIncidents} />
    </main>
  );
}
