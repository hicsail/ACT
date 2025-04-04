import { Admin, ListGuesser, Resource } from "react-admin";
import { config } from "./config/configuration";
import simpleRestProvider from "ra-data-simple-rest";

function App() {
  const dataSource = simpleRestProvider(config.backendURL);

  return (
    <Admin dataProvider={dataSource}>
      <Resource name="tasks" list={ListGuesser} />
    </Admin>
  );
}

export default App;
