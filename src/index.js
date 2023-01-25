import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './styles/_globals.scss';
import reportWebVitals from './reportWebVitals';
import { store, persistor } from './redux/store';
import RenderRoutes from './routing/RenderRoutes';
import { StyledEngineProvider } from '@mui/material';
import Scroll from './commons/Scroll';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyledEngineProvider injectFirst>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <RenderRoutes />
          <Scroll />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StyledEngineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
