import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import { createStore , combineReducers , applyMiddleware ,compose } from 'redux'
import reducer from './Store/Reducer/reducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'

const rootReducer = combineReducers({
    uiToggle : reducer
})

const logger = store => {
  return next => {
    return action => {
      const result = next(action);
      return result;
    }
  }
} 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store  = createStore(rootReducer ,composeEnhancers(applyMiddleware(logger , thunk)))

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
