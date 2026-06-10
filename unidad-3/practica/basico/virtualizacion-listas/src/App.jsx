import { useMemo, useState } from 'react';
import { NaiveList } from './components/NaiveList';
import { VirtualList } from './components/VirtualList';

function buildItems(size) {
  return Array.from({ length: size }, (_, index) => ({
    id: `incident-${index + 1}`,
    title: `Incidencia ${index + 1}`,
    severity: index % 3 === 0 ? 'alta' : index % 3 === 1 ? 'media' : 'baja',
  }));
}

const TOTAL_ITEMS = 3000;

export default function App() {
  const items = useMemo(() => buildItems(TOTAL_ITEMS), []);
  const [filter, setFilter] = useState('');
  const [mode, setMode] = useState('naive');

  const filteredItems = useMemo(
    () => items.filter((item) => item.title.toLowerCase().includes(filter.toLowerCase())),
    [items, filter],
  );

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '1rem', maxWidth: 600 }}>
      <h1>Virtualización de listas</h1>
      <p>
        Compara el rendimiento de renderizar <strong>{TOTAL_ITEMS} elementos</strong> de forma
        ingenua vs. virtualizada.
      </p>

      <label htmlFor="filter" style={{ display: 'block', marginBottom: '0.5rem' }}>
        Filtrar por nombre
        <input
          id="filter"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          placeholder="Escribe para filtrar…"
          style={{ marginLeft: '0.5rem' }}
        />
      </label>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button
          onClick={() => setMode('naive')}
          style={{ fontWeight: mode === 'naive' ? 'bold' : 'normal' }}
        >
          Lista ingenua
        </button>
        <button
          onClick={() => setMode('virtual')}
          style={{ fontWeight: mode === 'virtual' ? 'bold' : 'normal' }}
        >
          Lista virtualizada
        </button>
      </div>

      {mode === 'naive' ? (
        <NaiveList items={filteredItems} />
      ) : (
        <VirtualList items={filteredItems} />
      )}
    </main>
  );
}
