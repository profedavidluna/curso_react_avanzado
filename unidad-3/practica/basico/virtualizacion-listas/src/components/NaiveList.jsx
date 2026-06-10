import { useRef } from 'react';

// PROBLEMA: este componente monta TODOS los elementos en el DOM de una vez.
// Con 3 000+ ítems, el navegador crea miles de nodos, lo que impacta
// tanto el tiempo de montaje como el costo de cada re-render.
export function NaiveList({ items }) {
  const renders = useRef(0);
  renders.current += 1;

  return (
    <section>
      <h2>Lista ingenua</h2>
      <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
        Nodos en el DOM: <strong>{items.length}</strong> · Renders del contenedor:{' '}
        <strong>{renders.current}</strong>
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: 300, overflowY: 'auto' }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              height: 40,
              display: 'flex',
              alignItems: 'center',
              padding: '0 12px',
              borderBottom: '1px solid #f1f5f9',
            }}
          >
            <strong style={{ marginRight: '0.5rem' }}>{item.title}</strong>
            <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{item.severity}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
