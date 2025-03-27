import { FC } from 'react'
import './App.css'
import { Theme } from './theme/Theme'
import { Navigation } from './components/Navigation.component'
import { Footer } from './components/Footer.component'
import { Container } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Landing } from './pages/Landing.page'

const App: FC = () => {
  return (
    <Theme>
      <Navigation />
      <Container component='main'>
        <BrowserRouter>
          <Routes>
            <Route index path='/' element={<Landing />} />
          </Routes>
        </BrowserRouter>
      </Container>
      <Footer />
    </Theme>
  );
}

export default App;
