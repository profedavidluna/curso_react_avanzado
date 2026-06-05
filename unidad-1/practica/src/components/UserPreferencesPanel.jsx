import { usePreferences } from '../hooks/usePreferences';

export function UserPreferencesPanel() {
  const { preferences, updatePreference } = usePreferences();

  return (
    <section
      style={{
        border: '1px solid #334155',
        borderRadius: '12px',
        backgroundColor: '#1e293b',
        padding: '20px',
        maxWidth: '680px',
      }}
    >
      <h2 style={{ marginBottom: '10px' }}>Preferencias simuladas del usuario</h2>
      <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '14px' }}>
        Este contexto permite enseñar cómo compartir preferencias globales en toda la aplicación.
      </p>

      <ul style={{ display: 'grid', gap: '10px', listStyle: 'none', marginBottom: '20px' }}>
        <li><strong>Tema:</strong> {preferences.theme}</li>
        <li><strong>Idioma:</strong> {preferences.language}</li>
        <li><strong>Modo compacto:</strong> {preferences.compactMode ? 'Activo' : 'Inactivo'}</li>
        <li><strong>Sugerencias:</strong> {preferences.showSuggestions ? 'Activadas' : 'Desactivadas'}</li>
      </ul>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          className="add-book-button-action"
          onClick={() =>
            updatePreference('theme', preferences.theme === 'oscuro' ? 'claro' : 'oscuro')
          }
        >
          Alternar tema
        </button>
        <button
          className="book-card-button-details"
          onClick={() => updatePreference('compactMode', !preferences.compactMode)}
        >
          Alternar modo compacto
        </button>
      </div>
    </section>
  );
}
