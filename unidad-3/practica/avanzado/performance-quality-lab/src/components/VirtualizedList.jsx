import { useMemo, useState } from 'react';
import { useVisibleWindow } from '../hooks/useVisibleWindow';

const ITEM_HEIGHT = 40;
const VIEWPORT_HEIGHT = 240;

export function VirtualizedList({ items }) {
  const [scrollTop, setScrollTop] = useState(0);
  const { start, end } = useVisibleWindow({
    itemHeight: ITEM_HEIGHT,
    totalItems: items.length,
    viewportHeight: VIEWPORT_HEIGHT,
    scrollTop,
  });

  const visibleItems = useMemo(() => items.slice(start, end), [items, start, end]);
  const offsetTop = start * ITEM_HEIGHT;
  const totalHeight = items.length * ITEM_HEIGHT;

  return (
    <section>
      <h2>Listado virtualizado</h2>

      <div
        style={{
          height: VIEWPORT_HEIGHT,
          overflowY: 'auto',
          border: '1px solid #d1d5db',
        }}
        onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div style={{ position: 'absolute', top: offsetTop, left: 0, right: 0 }}>
            {visibleItems.map((item) => (
              <article
                key={item.id}
                style={{
                  height: ITEM_HEIGHT,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 12px',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                <strong>{item.title}</strong>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
