import { useState } from 'react';
import { MonolithicPanel } from './components/MonolithicPanel';
import { MetricsSummary } from './components/dashboard/MetricsSummary';
import { AlertsList } from './components/dashboard/AlertsList';
import { ActivityFeed } from './components/dashboard/ActivityFeed';
import { useOperationalData } from './hooks/useOperationalData';

export default function App() {
  const [mode, setMode] = useState('monolithic');
  const data = useOperationalData();

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '1rem', maxWidth: 700 }}>
      <h1>Segmentación de componentes pesados</h1>
      <p>
        Compara un panel monolítico contra su versión segmentada en subcomponentes con
        responsabilidad única.
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setMode('monolithic')}
          style={{ fontWeight: mode === 'monolithic' ? 'bold' : 'normal' }}
        >
          Panel monolítico
        </button>
        <button
          onClick={() => setMode('segmented')}
          style={{ fontWeight: mode === 'segmented' ? 'bold' : 'normal' }}
        >
          Panel segmentado
        </button>
      </div>

      {mode === 'monolithic' ? (
        <MonolithicPanel data={data} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <MetricsSummary metrics={data.metrics} />
          <AlertsList alerts={data.alerts} />
          <ActivityFeed activities={data.activities} />
        </div>
      )}
    </main>
  );
}
