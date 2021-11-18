import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'overlayscrollbars-react/dist/overlayscrollbars-react';
import 'admin-lte/dist/js/adminlte.min';
import 'admin-lte/dist/css/adminlte.min.css';
import './componentes/pagina/menu.js'
import App from './App';



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
