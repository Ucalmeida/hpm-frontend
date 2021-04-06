import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from './paginas/Login';
import Principal from './paginas/Principal';
import AlterarSenha from "./paginas/AlterarSenha";

class App extends Component {
  
  render() {
      return (
              <Router>
                      <Switch>
                          <Route exact path="/login" component={Login} />
                          <Route exact path="/" component={Login} />
                          <Route exact path="/principal" component={Principal} />
                          <Route exact path="/alterarSenha" component={AlterarSenha} />
                          {/*<Route exact path="/">*/}
                          {/*    {*/}
                          {/*        isLogado() ?*/}
                          {/*        <Login />*/}
                          {/*        : <Principal />*/}
                          {/*    }*/}
                          {/*</Route>*/}
                      </Switch>
              </Router>
      );
    }
  }

export default App;
