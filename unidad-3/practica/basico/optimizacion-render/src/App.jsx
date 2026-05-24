import { useCallback, useMemo, useState } from 'react';
import { MetricRow } from './components/MetricRow';

const baseMetrics = [
  { id: 'deploys', label: 'Deploys semanales', value: 12 },
  { id: 'bugs', label: 'Bugs críticos', value: 2 },
  { id: 'coverage', label: 'Cobertura', value: 87 },
];

export default function App() {
  const [threshold, setThreshold] = useState(0);
  const [note, setNote] = useState('');

  const visibleMetrics = useMemo(
    () => baseMetrics.filter((metric) => metric.value >= threshold),
    [threshold],
  );

  const summary = useMemo(() => {
    const total = visibleMetrics.reduce((acc, metric) => acc + metric.value, 0);
    return `${visibleMetrics.length} métricas visibles · total ${total}`;
  }, [visibleMetrics]);

  const handleThresholdChange = useCallback((event) => {
    setThreshold(Number(event.target.value));
  }, []);

  return (
    <main>
      <h1>Optimización de render</h1>

      <label htmlFor="threshold">
        Mostrar métricas con valor mayor o igual a
        <input
          id="threshold"
          type="number"
          min="0"
          value={threshold}
          onChange={handleThresholdChange}
        />
      </label>

      <label htmlFor="note">
        Nota interna (no afecta métricas)
        <input id="note" value={note} onChange={(event) => setNote(event.target.value)} />
      </label>

      <p>{summary}</p>

      <ul>
        {visibleMetrics.map((metric) => (
          <MetricRow key={metric.id} metric={metric} />
        ))}
      </ul>
    </main>
  );
}
