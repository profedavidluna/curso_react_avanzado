import { useShallow } from 'zustand/react/shallow';
import { useTestStore } from '../store/testStore';

export function UserPreferencesPanelDirectStore() {
  const { theme, language, compactMode, showSuggestions, updatePreference } = useTestStore(
    useShallow((state) => ({
      theme: state.theme,
      language: state.language,
      compactMode: state.compactMode,
      showSuggestions: state.showSuggestions,
      updatePreference: state.updatePreference,
    }))
  );

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
      <h2 style={{ marginBottom: '10px' }}>Preferencias desde store individual</h2>
      <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '14px' }}>
        Este panel consume cada preferencia directamente desde Zustand para comparar el comportamiento.
      </p>

      <ul style={{ display: 'grid', gap: '10px', listStyle: 'none', marginBottom: '20px' }}>
        <li><strong>Tema:</strong> {theme}</li>
        <li><strong>Idioma:</strong> {language}</li>
        <li><strong>Modo compacto:</strong> {compactMode ? 'Activo' : 'Inactivo'}</li>
        <li><strong>Sugerencias:</strong> {showSuggestions ? 'Activadas' : 'Desactivadas'}</li>
      </ul>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          className="add-book-button-action"
          onClick={() => updatePreference('theme', theme === 'oscuro' ? 'claro' : 'oscuro')}
        >
          Alternar tema
        </button>
        <button
          className="book-card-button-details"
          onClick={() => updatePreference('compactMode', !compactMode)}
        >
          Alternar modo compacto
        </button>
      </div>
    </section>
  );
}