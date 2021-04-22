import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from './paginas/Login';
import Principal from './paginas/Principal';


import CadastrarObjeto from "./paginas/cadastrar/CadastrarObjeto";
import CadastrarSangue from "./paginas/cadastrar/CadastrarSangue";
import CadastrarEspecialidade from "./paginas/cadastrar/CadastrarEspecialidade";
import CadastrarPessoa from "./paginas/cadastrar/CadastrarPessoa";
import 'overlayscrollbars-react/dist/overlayscrollbars-react';
import AlterarSenha from "./paginas/AlterarSenha";
import EsqueciMinhaSenha from "./paginas/EsqueciMinhaSenha";
import CadastrarPredio from "./paginas/cadastrar/CadastrarPredio";
import Topo from "./componentes/pagina/Topo";
import MenuLateral from "./componentes/pagina/MenuLateral";
import Rodape from "./componentes/pagina/Rodape";


class App extends Component {
  
  render() {
      return (
              <Router >
                  {/*<Topo />*/}
                  {/*<MenuLateral />*/}
                      <Switch>
                          <Route exact path="/login" component={Login} />
                          <Route exact path="/" component={Login} />
                          <Route exact path="/principal" component={Principal} />
                          <Route exact path="/alterarSenha" component={AlterarSenha} />
                          <Route exact path="/cadastrar/objeto" component={CadastrarObjeto} />
                          <Route exact path="/cadastrar/sangue" component={CadastrarSangue} />
                          <Route exact path="/cadastrar/especialidade" component={CadastrarEspecialidade} />
                          <Route exact path="/cadastrar/pessoa" component={CadastrarPessoa} />
                          <Route exact path="/cadastrar/predio" component={CadastrarPredio} />
                          <Route exact path="/esqueciMinhaSenha" component={EsqueciMinhaSenha}/>
                      </Switch>
                {/*<Rodape />*/}
              </Router>
      );
    }
  }

export default App;
