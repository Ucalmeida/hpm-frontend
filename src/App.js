import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Login from './modules/Login'
import Principal from "./modules/Principal";

//JS
import 'jquery/dist/jquery.min';
import 'overlayscrollbars-react/dist/overlayscrollbars-react';
import AlterarSenha from "./modules/AlterarSenha";

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
