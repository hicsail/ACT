import { FC } from 'react';
import './App.css';
import { Theme } from './theme/Theme';
import { Navigation } from './components/Navigation.component';
import { Footer } from './components/Footer.component';
import { Container } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Landing } from './pages/Landing.page';
import { AuthCallback } from './pages/AuthCallback.page';
import { CasdoorProvider } from './contexts/Casdoor.context';
import { Home } from './pages/Home.page';
import { UserContextProvider } from './contexts/User.context';
import { CameraCheck } from './pages/CameraCheck.page';
import { SnackbarProvider } from './contexts/Snackbar.context';
import { ClientProvider } from './contexts/Client.context';
import { TaskRecording } from './pages/TaskRecording.page';

const App: FC = () => {
  return (
    <Theme>
      <SnackbarProvider>
        <CasdoorProvider>
          <UserContextProvider>
            <ClientProvider>
              <Navigation />
              <Container component="main">
                <BrowserRouter>
                  <Routes>
                    <Route index path="/" element={<Landing />} />
                    <Route path="/callback" element={<AuthCallback />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cam-check" element={<CameraCheck />} />
                    <Route path="/taskcompletion/:taskCompletionId" element={<TaskRecording />} />
                  </Routes>
                </BrowserRouter>
              </Container>
              <Footer />
            </ClientProvider>
          </UserContextProvider>
        </CasdoorProvider>
      </SnackbarProvider>
    </Theme>
  );
};

export default App;
