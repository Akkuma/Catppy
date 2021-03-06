import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import app from './reducers';
import { nextCat } from './actions/gif';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(app);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();

nextCat(store.dispatch);

