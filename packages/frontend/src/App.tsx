import { FC } from "react";
import "./App.css";
import { Theme } from "./theme/Theme";
import { Navigation } from "./components/Navigation.component";
import { Footer } from "./components/Footer.component";
import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";
import { Landing } from "./pages/Landing.page";
import { AuthCallback } from "./pages/AuthCallback.page";
import { CasdoorProvider } from "./contexts/Casdoor.context";
import { Home } from "./pages/Home.page";
import { UserContextProvider } from "./contexts/User.context";
import { CameraCheck } from "./pages/CameraCheck.page";
import { SnackbarProvider } from "./contexts/Snackbar.context";

const App: FC = () => {
  return (
    <Theme>
      <SnackbarProvider>
        <CasdoorProvider>
          <UserContextProvider>
            <Navigation />
            <Container component="main">
              <BrowserRouter>
                <Routes>
                  <Route index path="/" element={<Landing />} />
                  <Route path="/callback" element={<AuthCallback />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/cam-check" element={<CameraCheck />} />
                </Routes>
              </BrowserRouter>
            </Container>
            <Footer />
          </UserContextProvider>
        </CasdoorProvider>
      </SnackbarProvider>
    </Theme>
  );
};

export default App;
