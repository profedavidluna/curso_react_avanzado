import { usePreferences } from '../contexts/PreferencesContext';
import { useSession } from '../contexts/SessionContext';

export function Dashboard() {
  const { user, renameUser } = useSession();
  const { theme, density, toggleTheme, changeDensity } = usePreferences();

  return (
    <section>
      <h2>Dashboard del equipo</h2>
      <p>
        Usuario: <strong>{user.name}</strong> · Equipo: {user.team}
      </p>
      <p>
        Tema: <strong>{theme}</strong> · Densidad: <strong>{density}</strong>
      </p>

      <button type="button" onClick={toggleTheme}>
        Cambiar tema
      </button>

      <button type="button" onClick={() => changeDensity('compact')}>
        Densidad compacta
      </button>

      <button type="button" onClick={() => renameUser('Ana R.')}>
        Renombrar usuario
      </button>
    </section>
  );
}
