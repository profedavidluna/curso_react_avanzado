import { memo, useRef } from 'react';

// SOLUCIÓN – Bloque 3: feed de actividad estático.
// No tiene estado propio; solo se re-renderiza cuando cambia la prop activities.
function ActivityFeedComponent({ activities }) {
  const renders = useRef(0);
  renders.current += 1;

  return (
    <section style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '1rem' }}>
      <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: 0 }}>
        Renders de ActivityFeed: <strong>{renders.current}</strong>
      </p>
      <h2 style={{ margin: '0 0 0.5rem' }}>Actividad reciente</h2>
      <ol style={{ margin: 0, paddingLeft: '1.5rem' }}>
        {activities.map((activity) => (
          <li key={activity.id} style={{ marginBottom: 4 }}>
            <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{activity.time}</span>{' '}
            {activity.description}
          </li>
        ))}
      </ol>
    </section>
  );
}

export const ActivityFeed = memo(ActivityFeedComponent);
