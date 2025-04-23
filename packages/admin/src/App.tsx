import { Admin, ListGuesser, Resource } from "react-admin";
import { config } from "./config/configuration";
import simpleRestProvider from "ra-data-simple-rest";
import { TaskCompletionsList } from "./components/taskcompletions/TaskCompletionsList.component";

function App() {
  const dataSource = simpleRestProvider(config.backendURL);

  return (
    <Admin dataProvider={dataSource}>
      <Resource name="tasks" list={ListGuesser} />
      <Resource name="taskCompletions" list={TaskCompletionsList} />
    </Admin>
  );
}

export default App;
