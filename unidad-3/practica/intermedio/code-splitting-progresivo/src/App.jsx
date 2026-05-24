import { lazy, Suspense, useMemo, useState } from 'react';
import { OverviewView } from './views/OverviewView';

const ReportsView = lazy(() => import('./views/ReportsView'));
const AuditView = lazy(() => import('./views/AuditView'));

const tabs = {
  overview: OverviewView,
  reports: ReportsView,
  audit: AuditView,
};

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const ActiveView = useMemo(() => tabs[activeTab], [activeTab]);

  return (
    <main>
      <h1>Code splitting progresivo</h1>

      <nav>
        <button type="button" onClick={() => setActiveTab('overview')}>
          Resumen
        </button>
        <button type="button" onClick={() => setActiveTab('reports')}>
          Reportes
        </button>
        <button type="button" onClick={() => setActiveTab('audit')}>
          Auditoría
        </button>
      </nav>

      <Suspense fallback={<p>Cargando módulo...</p>}>
        <ActiveView />
      </Suspense>
    </main>
  );
}
