import { modules } from './data/modules';
import { Tabs } from './components/Tabs';

export default function App() {
  return (
    <main>
      <h1>Panel de seguimiento del squad</h1>
      <Tabs defaultValue="metrics">
        <Tabs.List>
          <Tabs.Trigger value="metrics">Métricas</Tabs.Trigger>
          <Tabs.Trigger value="alerts">Alertas</Tabs.Trigger>
          <Tabs.Trigger value="agreements">Acuerdos</Tabs.Trigger>
        </Tabs.List>

        {modules.map((module) => (
          <Tabs.Panel key={module.id} value={module.id}>
            <h2>{module.title}</h2>
            <p>{module.description}</p>
          </Tabs.Panel>
        ))}
      </Tabs>
    </main>
  );
}
