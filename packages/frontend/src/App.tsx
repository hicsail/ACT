import { FC } from 'react'
import './App.css'
import { Theme } from './theme/Theme'
import { Navigation } from './components/Navigation.component'
import { Footer } from './components/Footer.component'
import { Container } from '@mui/material'

const App: FC = () => {
  return (
    <Theme>
      <Navigation />
      <Container component='main'>
        <h1>Hi</h1>
      </Container>
      <Footer />
    </Theme>
  );
}

export default App;
