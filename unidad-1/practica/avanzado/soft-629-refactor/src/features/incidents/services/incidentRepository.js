import { incidentMocks } from '../../../shared/mock/incidents';

export function getIncidents() {
  return incidentMocks.map((incident) => ({
    ...incident,
    summary: `${incident.team} · ${incident.status}`,
  }));
}
