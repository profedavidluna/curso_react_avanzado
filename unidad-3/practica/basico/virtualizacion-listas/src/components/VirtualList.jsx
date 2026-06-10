import { useMemo, useRef, useState } from 'react';

const ITEM_HEIGHT = 40;
const VIEWPORT_HEIGHT = 300;
const OVERSCAN = 3;

// SOLUCIÓN: solo los elementos visibles (más un overscan de seguridad)
// se convierten en nodos del DOM. El total de nodos activos es constante
// independientemente del tamaño del dataset.
export function VirtualList({ items }) {
  const [scrollTop, setScrollTop] = useState(0);
  const renders = useRef(0);
  renders.current += 1;

  const { visibleItems, offsetTop, totalHeight } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN);
    const visibleCount = Math.ceil(VIEWPORT_HEIGHT / ITEM_HEIGHT) + OVERSCAN * 2;
    const end = Math.min(items.length, start + visibleCount);

    return {
      visibleItems: items.slice(start, end).map((item, index) => ({ ...item, index: start + index })),
      offsetTop: start * ITEM_HEIGHT,
      totalHeight: items.length * ITEM_HEIGHT,
    };
  }, [items, scrollTop]);

  return (
    <section>
      <h2>Lista virtualizada</h2>
      <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
        Nodos en el DOM: <strong>{visibleItems.length}</strong> (de {items.length} totales) ·
        Renders del contenedor: <strong>{renders.current}</strong>
      </p>

      <div
        style={{ height: VIEWPORT_HEIGHT, overflowY: 'auto', border: '1px solid #d1d5db' }}
        onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div style={{ position: 'absolute', top: offsetTop, left: 0, right: 0 }}>
            {visibleItems.map((item) => (
              <div
                key={item.id}
                style={{
                  height: ITEM_HEIGHT,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 12px',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                <strong style={{ marginRight: '0.5rem' }}>{item.title}</strong>
                <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{item.severity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
