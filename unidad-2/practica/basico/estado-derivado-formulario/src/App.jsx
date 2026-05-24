import { useEnrollmentForm } from './hooks/useEnrollmentForm';

export default function App() {
  const { form, summary, updateField } = useEnrollmentForm();

  return (
    <main>
      <h1>Inscripción de talento React</h1>

      <label htmlFor="name">
        Nombre
        <input
          id="name"
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
        />
      </label>

      <label htmlFor="role">
        Rol
        <select
          id="role"
          value={form.role}
          onChange={(event) => updateField('role', event.target.value)}
        >
          <option value="frontend">Frontend</option>
          <option value="fullstack">Fullstack</option>
          <option value="tech-lead">Tech Lead</option>
        </select>
      </label>

      <label htmlFor="hoursPerWeek">
        Horas por semana
        <input
          id="hoursPerWeek"
          type="number"
          min="1"
          value={form.hoursPerWeek}
          onChange={(event) => updateField('hoursPerWeek', Number(event.target.value))}
        />
      </label>

      <label htmlFor="acceptsPolicy">
        <input
          id="acceptsPolicy"
          type="checkbox"
          checked={form.acceptsPolicy}
          onChange={(event) => updateField('acceptsPolicy', event.target.checked)}
        />
        Acepto política de participación
      </label>

      <section>
        <h2>Resumen derivado</h2>
        <p>Perfil: {summary.profile}</p>
        <p>Carga semanal: {summary.weeklyLoad}</p>
        <p>Listo para enviar: {summary.isReady ? 'Sí' : 'No'}</p>
      </section>
    </main>
  );
}
