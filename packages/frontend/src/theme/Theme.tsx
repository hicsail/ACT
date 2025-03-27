import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { FC } from 'react';

export interface ThemeProps {
  children: React.ReactNode;
}

export const Theme: FC<ThemeProps> = ({ children }) => {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#193948'
      }
    },
    typography: {
      h2: {
        fontSize: '30px'
      },
      h3: {
        fontSize: '15px'
      }
    }

  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
