import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import RouterBefore from './router/RouterBefore';



ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <RouterBefore></RouterBefore>
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
