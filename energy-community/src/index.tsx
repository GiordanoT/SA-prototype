import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.scss';
import App from './App';
import {createStore, Store} from "redux";
import {Provider} from 'react-redux';
import {rootReducer} from 'services/redux';

declare global { interface Window { store: Store; } }
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const store = createStore(rootReducer);
window.store = store;

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
);
