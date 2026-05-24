import { useMemo } from 'react';
import { VirtualizedList } from './components/VirtualizedList';

function buildDataset(size) {
  return Array.from({ length: size }, (_, index) => ({
    id: `item-${index + 1}`,
    title: `Incidencia ${index + 1}`,
  }));
}

export default function App() {
  const incidents = useMemo(() => buildDataset(2000), []);

  return (
    <main>
      <h1>Performance Quality Lab</h1>
      <p>
        Este laboratorio integra virtualización de listas y una guía de testing profesional para
        sostener refactorizaciones de performance.
      </p>

      <VirtualizedList items={incidents} />
    </main>
  );
}
