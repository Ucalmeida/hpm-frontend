import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {xfetch} from "./util";
import {HttpVerbo} from "./util/Constantes";
import {acoes} from "./componentes/pagina/acoes"

import Login from "./paginas/Login";
import Principal from "./paginas/Principal";
import {
    SetorFuncao,
    SetorFuncaoAcoes,
    SubSetor,
    PerfilAcoes,

} from "./paginas/vincular";
import EsqueciMinhaSenha from "./paginas/EsqueciMinhaSenha";
import RecuperarSenha from "./paginas/RecuperarSenha";
import {MenuLateral, Rodape, Topo} from "./componentes/pagina";
import {ConverterCaracteresEspeciaisSemEspaco} from "./util/StringUtil";
import Funcao from "./paginas/cadastrar/Funcao";
import InstituicaoConvenio from "./paginas/cadastrar/InstituicaoConvenio";
import Objeto from "./paginas/cadastrar/Objeto";
import Sangue from "./paginas/cadastrar/Sangue";
import Pessoa from "./paginas/cadastrar/Pessoa";
import Perfil from "./paginas/cadastrar/Perfil";
import Predio from "./paginas/cadastrar/Predio";
import Setor from "./paginas/cadastrar/Setor";
import Piso from "./paginas/cadastrar/Piso";
import Menu from "./paginas/cadastrar/Menu";
import Sala from "./paginas/cadastrar/Sala";
import Medicamento from "./paginas/cadastrar/Medicamento";
import Status from "./paginas/cadastrar/Status";
import Tipo from "./paginas/cadastrar/Tipo";
import Exame from "./paginas/cadastrar/Exame";
import ConsultorioBloco from "./paginas/cadastrar/ConsultorioBloco";
import Especialidade from "./paginas/cadastrar/Especialidade";

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
        // const gerarRotas = (subRotas, rotaUrl) => {
        //     subRotas.map((subRota, index) => {
        //         if (!subRota.acoes) {
        //             const ComponenteDinamico2 = require("./paginas/" + rotaUrl + "/" + ConverterCaracteresEspeciaisSemEspaco(subRota.nome)).default;
        //             return <Route exact path={"/"+rotaUrl+"/"+subRota.url} key={index}
        //                           render={() => (<ComponenteDinamico2 key={subRota.url}/>)}/>
        //         }
        //         return gerarRotas(subRotas.acoes, subRotas.url)
        //     })
        // }

        return (
            <div className={"wrapper principal"}>
                <Router >
                    <Topo />
                    <MenuLateral />
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/recuperarSenha/:hash" component={RecuperarSenha}/>
                        <Route exact path="/esqueciMinhaSenha" component={EsqueciMinhaSenha}/>
                        <Route exact path="/principal" component={Principal}/>
                        {
                            acoes.map((acao, index) => {
                                let ComponenteDinamico
                                if (!acao.acoes) {
                                    ComponenteDinamico = require("./paginas/" + ConverterCaracteresEspeciaisSemEspaco(acao.nome)).default
                                    console.log(<Route exact path={"/"+acao.url}
                                                       key={index}
                                                       render={() => (<ComponenteDinamico key={acao.url}/>)}/>)
                                    return (
                                        <Route exact path={"/"+acao.url}
                                               key={index}
                                               render={() => (<ComponenteDinamico key={acao.url}/>)}/>
                                    )
                                } else {

                                }
                                // console.log(gerarRotas(acao.acoes, acao.url))
                                // return gerarRotas(acao.acoes, acao.url)
                            })
                        }
                        {
                            acoes.map((acao, index) => {
                                if (acao.acoes != undefined && acao.acoes.length > 0) {
                                    acao.acoes.map((subAcao, index) => {
                                        const ComponenteDinamico = require("./paginas/" + acao.url + "/" + ConverterCaracteresEspeciaisSemEspaco(subAcao.nome)).default;
                                        return <Route exact path={"/"+acao.url+"/"+subAcao.url} key={index}
                                                      render={() => (<ComponenteDinamico key={subAcao.url}/>)}/>
                                    })
                                }
                            })
                        }

                        <Route exact path="/cadastrar/exame" component={Exame} />
                        <Route exact path="/cadastrar/consultorioBloco" component={ConsultorioBloco} />
                        <Route exact path="/cadastrar/objeto" component={Objeto} />
                        <Route exact path="/cadastrar/sangue" component={Sangue} />
                        <Route exact path="/cadastrar/especialidade" component={Especialidade} />
                        <Route exact path="/cadastrar/pessoa" component={Pessoa} />
                        <Route exact path="/cadastrar/predio" component={Predio} />
                        <Route exact path="/cadastrar/perfil" component={Perfil} />
                        <Route exact path="/cadastrar/tipo" component={Tipo} />
                        <Route exact path="/cadastrar/setor" component={Setor} />
                        <Route exact path="/cadastrar/funcao" component={Funcao} />
                        <Route exact path="/cadastrar/piso" component={Piso} />
                        <Route exact path="/cadastrar/menu" component={Menu} />
                        <Route exact path="/cadastrar/sala" component={Sala} />
                        <Route exact path="/cadastrar/medicamento" component={Medicamento} />
                        <Route exact path="/cadastrar/status" component={Status} />
                        <Route exact path="/cadastrar/instituicaoConvenio" component={InstituicaoConvenio} />
                        <Route exact path="/vincular/setorFuncao" component={SetorFuncao} />
                        <Route exact path="/vincular/setorFuncaoAcoes" component={SetorFuncaoAcoes} />
                        <Route exact path="/vincular/setorSubSetor" component={SubSetor} />
                        <Route exact path="/vincular/perfilAcoes" component={PerfilAcoes} />
                    </Switch>
                    <Rodape />
                </Router>
            </div>
        );
    }
}

export default App;
