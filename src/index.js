import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer.js';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './localstore/configureStore';
import { BrowserRouter } from 'react-router-dom';

const middlewares = [thunk]
const { store, persistor } = configureStore()
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
