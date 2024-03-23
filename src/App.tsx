import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import RouterBefore from './router/RouterBefore';
const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function App() {
  return (
    <RouterBefore />
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
              // 👇 palette values for light mode
              primary: { main: '#362FD9' },
              background: {
                default: '#e1e1e3',
                paper: '#B6BBC4',
              },
              text: {
                primary: '#000000',
              },
            }
            : {
              // 👇 palette values for dark mode
              primary: { main: '#fff' },
              background: {
                default: '#3b3a39',
                paper: '#010030',
              },
              text: {
                primary: '#fff',
              },
            }),
        },
      }),
    [mode],
  );

  return (

      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ColorModeContext.Provider>
  
  );
}
