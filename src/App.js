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
    CadastrarFuncao,
    CadastrarPerfil,
    CadastrarPiso,
    CadastrarMenu,
    CadastrarSala,
    CadastrarInstituicaoConvenio,
    CadastrarMedicamento,
    CadastrarStatus,
    CadastrarExame,
    CadastrarConsultorioBloco

} from "./paginas/cadastrar"
import {
    VincularSetorFuncao,
    SetorFuncaoAcoes,
    VincularSubSetor,
    VincularPerfilAcao,

} from "./paginas/vincular";
import {CadastrarTipo} from "./paginas/cadastrar/CadastrarTipo";
import AlterarSenha from "./paginas/AlterarSenha";
import EsqueciMinhaSenha from "./paginas/EsqueciMinhaSenha";
import RecuperarSenha from "./paginas/RecuperarSenha";
import {MenuLateral, Rodape, Topo} from "./componentes/pagina";


function verificaToken() {
    xfetch('/validaToken', {token: localStorage.getItem('token')}, HttpVerbo.POST)
        .then(json => {
                if (json) {
                    let valido = json.resultado
                    if (!valido) {
                        localStorage.clear()
                        window.location.replace('/login')
                    }
                }
            }
        )
}

clearInterval(window.checaSeguranca)
window.checaSeguranca = setInterval(function() {verificaToken();}, 1_000 * 60 * 2);

class App extends Component {

    render() {
        return (
            <div className={"wrapper principal"}>
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
                        <Route exact path="/esqueciMinhaSenha" component={EsqueciMinhaSenha}/>
                        <Route exact path="/cadastrar/predio" component={CadastrarPredio} />
                        <Route exact path="/cadastrar/perfil" component={CadastrarPerfil} />
                        <Route exact path="/recuperarSenha/:hash" component={RecuperarSenha}/>
                        <Route exact path="/cadastrar/tipo" component={CadastrarTipo} />
                        <Route exact path="/cadastrar/setor" component={CadastrarSetor} />
                        <Route exact path="/cadastrar/funcao" component={CadastrarFuncao} />
                        <Route exact path="/cadastrar/piso" component={CadastrarPiso} />
                        <Route exact path="/cadastrar/menu" component={CadastrarMenu} />
                        <Route exact path="/cadastrar/sala" component={CadastrarSala} />
                        <Route exact path="/cadastrar/medicamento" component={CadastrarMedicamento} />
                        <Route exact path="/cadastrar/status" component={CadastrarStatus} />
                        <Route exact path="/cadastrar/exame" component={CadastrarExame} />
                        <Route exact path="/cadastrar/consultorioBloco" component={CadastrarConsultorioBloco} />
                        <Route exact path="/cadastrar/instituicaoConvenio" component={CadastrarInstituicaoConvenio} />
                        <Route exact path="/vincular/setorFuncao" component={VincularSetorFuncao} />
                        <Route exact path="/vincular/setorFuncaoAcoes" component={SetorFuncaoAcoes} />
                        <Route exact path="/vincular/setorSubSetor" component={VincularSubSetor} />
                        <Route exact path="/vincular/perfilAcao" component={VincularPerfilAcao} />
                    </Switch>
                    <Rodape />
                </Router>
            </div>
        );
    }
}

export default App;
