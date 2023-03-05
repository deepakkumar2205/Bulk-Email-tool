import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer } from 'react-toastify';
import Provider from './Context/Provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
    <Provider>
      <App />
      </Provider>
      <ToastContainer />
    </BrowserRouter>
  // </React.StrictMode>
);
