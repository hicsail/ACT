import { Admin, Resource } from 'react-admin';
import { config } from './config/configuration';
import simpleRestProvider from 'ra-data-simple-rest';
import { TaskCompletionsList } from './components/taskcompletions/TaskCompletionsList.component';
import { ClientProvider } from './contexts/Client.context';
import { TasksLists } from './components/tasks/TasksLists.component';

function App() {
  const dataSource = simpleRestProvider(config.backendURL);

  return (
    <ClientProvider>
      <Admin dataProvider={dataSource}>
        <Resource name="tasks" list={TasksLists} />
        <Resource name="taskCompletions" list={TaskCompletionsList} />
      </Admin>
    </ClientProvider>
  );
}

export default App;
