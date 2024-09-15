import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Home from './presentation/pages/Home';
import "./presentation/styles/index.css"
import "./presentation/styles/chatMessage.css"
import { Provider } from 'react-redux';
import { store } from './application/store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Home />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
