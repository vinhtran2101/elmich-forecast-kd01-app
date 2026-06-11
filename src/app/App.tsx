import { AppShell } from '../components/AppShell';
import { LarkRuntimePanel } from '../features/lark/LarkRuntimePanel';
import { RecordsPage } from '../features/records/RecordsPage';

function App() {
  return (
    <AppShell>
      <RecordsPage />
      <LarkRuntimePanel />
    </AppShell>
  );
}

export default App;
