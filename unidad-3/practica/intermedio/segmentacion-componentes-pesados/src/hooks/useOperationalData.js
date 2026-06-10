import { useMemo } from 'react';

// Centraliza los datos simulados del panel operacional.
// Al vivir fuera de los componentes de presentación, los datos
// pueden cambiar de fuente (API, WebSocket, mock) sin tocar la UI.
export function useOperationalData() {
  return useMemo(
    () => ({
      metrics: [
        { id: 'uptime', label: 'Uptime (%)', value: 99 },
        { id: 'latency', label: 'Latencia promedio (ms)', value: 120 },
        { id: 'errors', label: 'Errores por hora', value: 4 },
        { id: 'deploys', label: 'Deploys esta semana', value: 7 },
      ],
      alerts: [
        { id: 'a1', level: 'critica', message: 'Servicio de pagos sin respuesta' },
        { id: 'a2', level: 'advertencia', message: 'Cola de mensajes al 85% de capacidad' },
        { id: 'a3', level: 'advertencia', message: 'Certificado SSL vence en 10 días' },
        { id: 'a4', level: 'critica', message: 'Error de replicación en base de datos secundaria' },
      ],
      activities: [
        { id: 'act1', time: '14:32', description: 'Deploy v2.4.1 completado en producción.' },
        { id: 'act2', time: '14:15', description: 'Alerta de pagos creada automáticamente.' },
        { id: 'act3', time: '13:50', description: 'Rollback de configuración de caché ejecutado.' },
        { id: 'act4', time: '13:20', description: 'Revisión de seguridad iniciada por el equipo.' },
      ],
    }),
    [],
  );
}
