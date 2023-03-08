import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Provider from './Context/Provider';
// pootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
//react quill css
import 'react-quill/dist/quill.snow.css';
// toast css 
import 'react-toastify/dist/ReactToastify.css';
// react-tooltip css
import 'react-tooltip/dist/react-tooltip.css';
// dataPicker css
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

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
