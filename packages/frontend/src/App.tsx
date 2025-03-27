import { FC } from 'react'
import './App.css'
import { Theme } from './theme/Theme'
import { Navigation } from './components/Navigation.component'

const App: FC = () => {
  return (
    <Theme>
      <Navigation />
      <h1>Hi</h1>
    </Theme>
  );
}

export default App;
