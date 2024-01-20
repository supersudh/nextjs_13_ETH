import DashboardContainer from './containers/DashboardContainer';
import { AppContextProvider } from './lib/state-management';

export default function Page() {
  return (
    <AppContextProvider>
      <DashboardContainer />
    </AppContextProvider>
  );
}
