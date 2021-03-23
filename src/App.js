import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Login from './paginas/Login';
import Principal from './paginas/Principal';
import AlterarSenha from "./paginas/AlterarSenha";


class App extends Component {
  
  render() {
      console.log(process.env)
      return (
          <Router>
              <Route path="/" exact component={Login} />
              <Route path="/principal" exact component={Principal} />
              <Route path="/alterarSenha" exact component={AlterarSenha} />
          </Router>
      );
    }
  }

export default App;
