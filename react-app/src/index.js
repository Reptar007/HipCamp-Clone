import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { DateProvider } from './context/dates';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <DateProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </DateProvider>
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
