import { Admin, Resource, fetchUtils } from 'react-admin';
import { config } from './config/configuration';
import simpleRestProvider from 'ra-data-simple-rest';
import { TaskCompletionsList } from './components/taskcompletions/TaskCompletionsList.component';
import { ClientProvider } from './contexts/Client.context';
import { TasksLists } from './components/tasks/TasksLists.component';
import { SetsList } from './components/sets/SetsList.component';
import { StudyMappingList } from './components/studymapping/StudyMappingList.component';
import { BrowserRouter } from 'react-router-dom';
import { authProvider, JWT_TOKEN_KEY } from './auth';
import { DownloadsList } from './components/downloads/DownloadsLists.component';

function App() {
  const httpClient = (url: string, options: fetchUtils.Options = {}) => {
    if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
    }

    const token = localStorage.getItem(JWT_TOKEN_KEY);
    (options.headers as Headers).set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
  };
  const dataSource = simpleRestProvider(config.backendURL, httpClient);

  return (
    <BrowserRouter>
      <ClientProvider>
        <Admin dataProvider={dataSource} authProvider={authProvider} loginPage={false}>
          <Resource name="sets" list={SetsList} />
          <Resource name="tasks" list={TasksLists} />
          <Resource name="taskCompletions" list={TaskCompletionsList} />
          <Resource name="studymapping" list={StudyMappingList} />
          <Resource name="downloads" list={DownloadsList} />
        </Admin>
      </ClientProvider>
    </BrowserRouter>
  );
}

export default App;
