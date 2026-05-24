import { useMemo } from 'react';

export function useVisibleWindow({ itemHeight, totalItems, viewportHeight, scrollTop, overscan = 2 }) {
  return useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const visibleCount = Math.ceil(viewportHeight / itemHeight) + overscan * 2;
    const end = Math.min(totalItems, start + visibleCount);

    return { start, end };
  }, [itemHeight, totalItems, viewportHeight, scrollTop, overscan]);
}
