import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import ToggleColorMode from './App';
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ToggleColorMode />
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
