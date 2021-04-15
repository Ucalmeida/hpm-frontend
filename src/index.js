import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'overlayscrollbars-react/dist/overlayscrollbars-react';
import 'admin-lte/dist/js/adminlte.min';
// import './menu'
import App from './App';



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
