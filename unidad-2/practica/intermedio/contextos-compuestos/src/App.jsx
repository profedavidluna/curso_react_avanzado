import { Dashboard } from './components/Dashboard';
import { PreferencesProvider } from './contexts/PreferencesContext';
import { SessionProvider } from './contexts/SessionContext';

export default function App() {
  return (
    <SessionProvider>
      <PreferencesProvider>
        <main>
          <h1>Context API avanzada</h1>
          <Dashboard />
        </main>
      </PreferencesProvider>
    </SessionProvider>
  );
}
