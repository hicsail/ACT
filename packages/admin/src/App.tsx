import { Admin, Resource } from 'react-admin';
import { config } from './config/configuration';
import simpleRestProvider from 'ra-data-simple-rest';
import { TaskCompletionsList } from './components/taskcompletions/TaskCompletionsList.component';
import { ClientProvider } from './contexts/Client.context';
import { TasksLists } from './components/tasks/TasksLists.component';
import { SetsList } from './components/sets/SetsList.component';
import { StudyMappingList } from './components/studymapping/StudyMappingList.component';
import { CasdoorProvider } from './contexts/Casdoor.context';
import { AuthProvider, useAuth } from './contexts/Auth.context';

function App() {
  return (
    <ClientProvider>
      <CasdoorProvider>
        <AuthProvider>
          <InnerWrapper />
        </AuthProvider>
      </CasdoorProvider>
    </ClientProvider>
  );
}

/**
 * Inner container for React admin content so the outer providers
 * can be leveraged
 */
const InnerWrapper: React.FC = () => {
  const dataSource = simpleRestProvider(config.backendURL);
  const auth = useAuth();

  return (
    <>
      {auth.authProvider &&
        <Admin dataProvider={dataSource} authProvider={auth.authProvider}>
          <Resource name="sets" list={SetsList} />
          <Resource name="tasks" list={TasksLists} />
          <Resource name="taskCompletions" list={TaskCompletionsList} />
          <Resource name="studymapping" list={StudyMappingList} />
        </Admin>
      }
    </>
  );
};

export default App;
