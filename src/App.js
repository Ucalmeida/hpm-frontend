import './App.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Login from './modules/Login';
import Principal from './modules/Principal';
//CSS
//JS
import 'admin-lte/dist/js/adminlte.min';
import 'overlayscrollbars-react/dist/overlayscrollbars-react';

class App extends Component {
  
  render() {
      return (
          <Router>
              <Route path="/" exact component={Login} />
              <Route path="/principal" exact component={Principal} />
          </Router>
      );
    }
  }

export default App;
