import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Login from './paginas/Login';
import Principal from './paginas/Principal';
import AlterarSenha from "./paginas/AlterarSenha";
import Topo from "./componentes/pagina/Topo";
import MenuLateral from "./componentes/pagina/MenuLateral";
import Pagina from "./componentes/pagina/Pagina";
import Rodape from "./componentes/pagina/Rodape";
import BotaoScrollTop from "./componentes/pagina/BotaoScrollTop";


class App extends Component {
  
  render() {
      console.log(process.env)
      return (
              <Router>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/Principal" component={Principal} />
                  <Route exact path="/alterarSenha" component={AlterarSenha} />
              </Router>
          // <div className="wrapper">
          // <Topo />
          // <MenuLateral />
          // <Rodape />
          // <BotaoScrollTop />
          // </div>
      );
    }
  }

export default App;
