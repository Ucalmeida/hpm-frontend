import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {xfetch} from "./util";
import {HttpVerbo} from "./util/Constantes";

import Login from './paginas/Login';
import Principal from './paginas/Principal';
import {
    CadastrarEspecialidade,
    CadastrarObjeto,
    CadastrarPessoa,
    CadastrarPredio,
    CadastrarSangue,
    CadastrarSetor,
    CadastrarFuncao

} from "./paginas/cadastrar"
import {
    VincularSetorFuncao
} from "./paginas/vincular";
import {CadastrarTipo} from "./paginas/cadastrar/CadastrarTipo";
import AlterarSenha from "./paginas/AlterarSenha";
import EsqueciMinhaSenha from "./paginas/EsqueciMinhaSenha";
import RecuperarSenha from "./paginas/RecuperarSenha";
import Topo from "./componentes/pagina/Topo";
import MenuLateral from "./componentes/pagina/MenuLateral";
import Rodape from "./componentes/pagina/Rodape";


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
window.checaSeguranca = setInterval(function() {verificaToken();}, 1_000 * 60 * 10);

class App extends Component {

    render() {
        return (
            <Router >
                <Topo />
                <MenuLateral />
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
                    <Route exact path="/recuperarSenha/:hash" component={RecuperarSenha}/>
                    <Route exact path="/cadastrar/tipo" component={CadastrarTipo} />
                    <Route exact path="/cadastrar/setor" component={CadastrarSetor} />
                    <Route exact path="/cadastrar/funcao" component={CadastrarFuncao} />
                    <Route exact path="/vincular/setorFuncao" component={VincularSetorFuncao} />

                </Switch>
                <Rodape />
            </Router>
        );
    }
}

export default App;
