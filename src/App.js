import React, {Component, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {xfetch} from "./util";
import {HttpVerbo} from "./util/Constantes";

import Login from './paginas/Login';
import Principal from './paginas/Principal';
// import {
//     CadastrarEspecialidade,
//     CadastrarObjeto,
//     CadastrarPessoa,
//     CadastrarPredio,
//     CadastrarSangue,
//     CadastrarSetor,
//     CadastrarFuncao,
//     CadastrarPerfil,
//     CadastrarPiso,
//     CadastrarMenu,
//     CadastrarSala,
//     CadastrarInstituicaoConvenio,
//     CadastrarMedicamento,
//     CadastrarStatus,
//     CadastrarExame
// } from "./paginas/cadastrar";
// import {
//     SetorFuncao,
//     SetorFuncaoAcoes,
//     SubSetor,
//     PerfilAcoes
//
// } from "./paginas/vincular";

import AgendadeConsultas from "./paginas/AgendadeConsultas";

import ConsultasAgendadas from "./paginas/agendar/ConsultasAgendadas";
import AgendarConsulta from "./paginas/agendar/Consulta";

import Objeto from "./paginas/cadastrar/Objeto";
import Sangue from "./paginas/cadastrar/Sangue";
import Especialidade from "./paginas/cadastrar/Especialidade";
import Pessoa from "./paginas/cadastrar/Pessoa";
import Predio from "./paginas/cadastrar/Predio";
import Perfil from "./paginas/cadastrar/Perfil";
import Tipo from "./paginas/cadastrar/Tipo";
import Setor from "./paginas/cadastrar/Setor";
import Funcao from "./paginas/cadastrar/Funcao";
import Piso from "./paginas/cadastrar/Piso";
import Menu from "./paginas/cadastrar/Menu";
import Sala from "./paginas/cadastrar/Sala";
import Medicamento from "./paginas/cadastrar/Medicamento";
import Status from "./paginas/cadastrar/Status";
import Exame from "./paginas/cadastrar/Exame";
import InstituicaoConvenio from "./paginas/cadastrar/InstituicaoConvenio";
import ConsultorioBloco from "./paginas/cadastrar/ConsultorioBloco";
import Dependente from "./paginas/cadastrar/Dependente";
import Consulta from "./paginas/cadastrar/Consulta";
import CadastrarEscala from "./paginas/cadastrar/CadastrarEscala";

import EditordeTexto from "./paginas/EditordeTexto";

import ListarDependentes from "./paginas/listar/ListarDependentes";
import ListarEscalas from "./paginas/listar/ListarEscalas";
import ListarEspecialidadePorProfissionalSaude from "./paginas/listar/ListarEspecialidadePorProfissionalSaude";
import ListarProfissionaisSaude from "./paginas/listar/ListarProfissionaisSaude";

import ListarPacientes from "./paginas/recepcao/ListarPacientes";
import MarcarConsultas from "./paginas/recepcao/MarcarConsultas";

import Atendimentos from "./paginas/relatorio/Atendimentos";

import {SetorFuncao} from "./paginas/vincular/SetorFuncao";
import {SetorFuncaoAcoes} from "./paginas/vincular/SetorFuncaoAcoes";
import {SubSetor} from "./paginas/vincular/SubSetor";
import {PerfilAcoes} from "./paginas/vincular/PerfilAcoes";

import AlterarSenha from "./paginas/AlterarSenha";
import EsqueciMinhaSenha from "./paginas/EsqueciMinhaSenha";
import RecuperarSenha from "./paginas/RecuperarSenha";
import {MenuLateral, Rodape, Topo} from "./componentes/pagina";
import CadastrarSistemaExterno from "./paginas/cadastrar/CadastrarSistemaExterno";
import PessoaPerfis from "./paginas/vincular/PessoaPerfis";



function verificaToken() {
    xfetch('/validaToken', {token: localStorage.getItem('token')}, HttpVerbo.POST)
        .then(json => {
                let valido = json.resultado
                if (!valido) {
                    localStorage.clear()
                    window.location.replace('/login')
                }
            }
        )
}

clearInterval(window.checaSeguranca)
window.checaSeguranca = setInterval(function() {verificaToken();}, 1_000 * 60 * 2);

const App =  () =>  {

    const perfil = localStorage.getItem('perfis');

    console.log("Perfil:", perfil);

    return (
        <div className={"wrapper principal"}>
            <Router >
                <Topo />
                <MenuLateral />
                <Switch>
                    <Route idPerfil={4}  exact path="/login" component={Login} />
                    <Route idPerfil={4}  exact path="/" component={Login} />
                    <Route idPerfil={4}  exact path="/principal" component={Principal}/>
                    <Route idPerfil={4}  exact path="/alterarSenha" component={AlterarSenha} />

                    <Route idPerfil={4}  exact path="/agendadeConsultas" component={AgendadeConsultas} />

                    <Route idPerfil={4}  exact path="/agendar/consulta" component={AgendarConsulta} />
                    <Route idPerfil={4}  exact path="/agendar/consultasAgendadas" component={ConsultasAgendadas} />

                    <Route idPerfil={4}  exact path="/cadastrar/objeto" component={Objeto} />
                    <Route idPerfil={4}  exact path="/cadastrar/sangue" component={Sangue} />
                    <Route idPerfil={4}  exact path="/cadastrar/especialidade" component={Especialidade} />
                    <Route idPerfil={4}  exact path="/cadastrar/pessoa" component={Pessoa} />
                    <Route idPerfil={4}  exact path="/esqueciMinhaSenha" component={EsqueciMinhaSenha}/>
                    <Route idPerfil={4}  exact path="/cadastrar/predio" component={Predio} />
                    <Route idPerfil={4}  exact path="/cadastrar/perfil" component={Perfil} />
                    <Route idPerfil={4}  exact path="/recuperarSenha/:hash" component={RecuperarSenha}/>
                    <Route idPerfil={4}  exact path="/cadastrar/tipo" component={Tipo} />
                    <Route idPerfil={4}  exact path="/cadastrar/setor" component={Setor} />
                    <Route idPerfil={4}  exact path="/cadastrar/funcao" component={Funcao} />
                    <Route idPerfil={4}  exact path="/cadastrar/piso" component={Piso} />
                    <Route idPerfil={2}  exact path="/cadastrar/menu" component={Menu} />
                    <Route idPerfil={4}  exact path="/cadastrar/sala" component={Sala} />
                    <Route idPerfil={4}  exact path="/cadastrar/medicamento" component={Medicamento} />
                    <Route idPerfil={4}  exact path="/cadastrar/status" component={Status} />
                    <Route idPerfil={4}  exact path="/cadastrar/exame" component={Exame} />
                    <Route idPerfil={4}  exact path="/cadastrar/instituicaoConvenio" component={InstituicaoConvenio} />
                    <Route idPerfil={4}  exact path="/cadastrar/consultorioBloco" component={ConsultorioBloco} />
                    <Route idPerfil={4}  exact path="/cadastrar/consulta" component={Consulta} />
                    <Route idPerfil={4}  exact path="/cadastrar/dependente" component={Dependente} />
                    <Route idPerfil={4}  exact path="/cadastrar/cadastrarEscala" component={CadastrarEscala} />
                    <Route idPerfil={4}  exact path="/cadastrar/cadastrarSistemaExterno" component={CadastrarSistemaExterno}/>

                    <Route idPerfil={4}  exact path="/editordeTexto" component={EditordeTexto} />

                    <Route idPerfil={4}  exact path="/listar/listarDependentes" component={ListarDependentes} />
                    <Route idPerfil={4}  exact path="/listar/listarEscalas" component={ListarEscalas} />
                    <Route idPerfil={4}  exact path="/listar/listarEspecialidadePorProfissionalSaude" component={ListarEspecialidadePorProfissionalSaude} />
                    <Route idPerfil={4}  exact path="/listar/listarProfissionaisSaude" component={ListarProfissionaisSaude} />

                    <Route idPerfil={4}  exact path="/recepcao/listarPacientes" component={ListarPacientes} />
                    <Route idPerfil={4}  exact path="/recepcao/marcarConsultas" component={MarcarConsultas} />

                    <Route idPerfil={4}  exact path="/relatorio/atendimentos" component={Atendimentos} />

                    <Route idPerfil={4}  exact path="/vincular/setorFuncao" component={SetorFuncao} />
                    <Route idPerfil={4}  exact path="/vincular/setorFuncaoAcoes" component={SetorFuncaoAcoes} />
                    <Route idPerfil={4}  exact path="/vincular/setorSubSetor" component={SubSetor} />
                    <Route idPerfil={4}  exact path="/vincular/perfilAcoes" component={PerfilAcoes} />
                    <Route exact path="/vincular/pessoaPerfis" component={PessoaPerfis} />
                </Switch>
                <Rodape />
            </Router>
        </div>
    );
}

export default App;