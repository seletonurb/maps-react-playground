import './index.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, history } from './store';
import { ConnectedRouter } from 'connected-react-router';

import App from './components/App';

const container = document.getElementById('root')
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);
