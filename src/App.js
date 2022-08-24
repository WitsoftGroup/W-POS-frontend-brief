import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { es } from 'date-fns/locale';
import { Helmet } from 'react-helmet';

import { store, persistor } from 'redux/store';
import { routes, renderRoutes } from 'routes';
import ThemeConfig from 'theme';
import NotistackProvider from 'components/ui-components/NotistackProvider';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeConfig>
        <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
          <NotistackProvider>
            <Helmet>
              <title>{process.env.REACT_APP_PARTNER_NAME}</title>
            </Helmet>
            <Router>{renderRoutes(routes)}</Router>
          </NotistackProvider>
        </LocalizationProvider>
      </ThemeConfig>
    </PersistGate>
  </Provider>
);

export const reduxStore = store;

export default App;
