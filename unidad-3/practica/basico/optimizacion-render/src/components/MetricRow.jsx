import { memo, useRef } from 'react';

function MetricRowComponent({ metric }) {
  const renders = useRef(0);
  renders.current += 1;

  return (
    <li>
      <strong>{metric.label}</strong>: {metric.value} (renders: {renders.current})
    </li>
  );
}

export const MetricRow = memo(MetricRowComponent);
