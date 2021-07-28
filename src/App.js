import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {xfetch} from "./util";
import {HttpVerbo} from "./util/Constantes";
import {acoes} from "./json/acoes"

import Login from "./paginas/Login";
import Principal from "./paginas/Principal";
import EsqueciMinhaSenha from "./paginas/EsqueciMinhaSenha";
import RecuperarSenha from "./paginas/RecuperarSenha";
import {MenuLateral, Rodape, Topo} from "./componentes/pagina";
import {ConverterCaracteresEspeciaisSemEspaco} from "./util/StringUtil";

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


    const gerarRotas = (subRotas, rotaUrl) => {
        return subRotas.map((subRota, index) => {
            if (!subRota.acoes) {
                const ComponenteDinamico = require("./paginas/" + rotaUrl + "/" + ConverterCaracteresEspeciaisSemEspaco(subRota.nome)).default;
                return <Route exact path={"/"+rotaUrl+"/"+subRota.url} key={index}
                              render={() => (<ComponenteDinamico key={subRota.url}/>)}/>
            }
            return gerarRotas(subRotas.acoes, rotaUrl+"/"+subRotas.url)
        })
    }
class App extends Component {

    render() {

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
                                if (!acao.acoes) {
                                    const ComponenteDinamico = require("./paginas/" + ConverterCaracteresEspeciaisSemEspaco(acao.nome)).default
                                    return (
                                        <Route exact path={"/"+acao.url}
                                               key={index}
                                               render={() => (<ComponenteDinamico key={acao.url}/>)}/>
                                    )
                                } else {
                                    return gerarRotas(acao.acoes, acao.url)
                                }
                            })
                        }
                    </Switch>
                    <Rodape />
                </Router>
            </div>
        );
    }
}

export default App;
