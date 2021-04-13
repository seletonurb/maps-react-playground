import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createRootReducer from './reducer';

import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import reduxThunk from 'redux-thunk';

export const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  return applyMiddleware(myRouterMiddleware, reduxThunk);
};

export const store = createStore(createRootReducer(history), composeWithDevTools(getMiddleware()));
