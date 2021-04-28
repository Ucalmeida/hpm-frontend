import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {HttpVerbo, xfetch} from "./util";

import Login from './paginas/Login';
import Principal from './paginas/Principal';
import {CadastrarEspecialidade, CadastrarObjeto, CadastrarPessoa, CadastrarPredio, CadastrarSangue} from "./paginas/cadastrar";
import AlterarSenha from "./paginas/AlterarSenha";
import EsqueciMinhaSenha from "./paginas/EsqueciMinhaSenha";


function verificaToken() {
    xfetch('/validaToken', {token: localStorage.getItem('token')}, HttpVerbo.POST)
        .then(json => {
                let valido = json.resultado
                if (!valido) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('usuario')
                }
            }
        )
}

clearInterval(window.checaSeguranca)
window.checaSeguranca = setInterval(function() {verificaToken();}, 1_000 * 60 * 3);

class App extends Component {
  
  render() {
      return (
              <Router >
                  {/*<Topo />*/}
                  {/*<MenuLateral />*/}
                      <Switch>
                          <Route exact path="/login" component={Login} />
                          <Route exact path="/" component={Login} />
                          <Route exact path="/principal" component={Principal}/>
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
