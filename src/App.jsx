import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { xfetch } from "./util";
import { HttpVerbo } from "./util/Constantes";

import Login from './paginas/Login';
import Principal from './paginas/Principal';

import AgendadeConsultas from "./paginas/AgendadeConsultas";

import AgendarConsulta from "./paginas/agendar/Consulta";
import ConsultasAgendadas from "./paginas/agendar/ConsultasAgendadas";
import ConsultasAgendadasImprimir from "./paginas/agendar/ConsultasAgendadasImprimir";

import AtestadoImprimir from "./paginas/atendimento/AtestadoImprimir";
import MarcarConsultaMedico from './paginas/atendimento/MarcarConsultaMedico';
// import Impressos from './paginas/atendimento/Impressos';
import ListaPacientesParaAtendimento from "./paginas/atendimento/ListaPacientesParaAtendimento";
import ListaHistoricosPacientes from "./paginas/atendimento/ListaHistoricosPacientes";
import PacienteEmAtendimento from "./paginas/atendimento/PacienteEmAtendimento";
import PacienteEmAtendimentoOdontologia from "./paginas/atendimento/PacienteEmAtendimentoOdontologia";
import ReceitaImprimir from "./paginas/atendimento/ReceitaImprimir";

import CadastrarEscala from "./paginas/cadastrar/CadastrarEscala";
import CadastrarEspecialidadeProfissionalSaude from "./paginas/cadastrar/CadastrarEspecialidadeProfissionalSaude";
import ConsultorioBloco from "./paginas/cadastrar/ConsultorioBloco";
import Dependente from "./paginas/cadastrar/Dependente";
import Especialidade from "./paginas/cadastrar/Especialidade";
import Exame from "./paginas/cadastrar/Exame";
import Funcao from "./paginas/cadastrar/Funcao";
import InstituicaoConvenio from "./paginas/cadastrar/InstituicaoConvenio";
import Medicamento from "./paginas/cadastrar/Medicamento";
import Menu from "./paginas/cadastrar/Menu";
import Objeto from "./paginas/cadastrar/Objeto";
import Perfil from "./paginas/cadastrar/Perfil";
import Pessoa from "./paginas/cadastrar/Pessoa";
import Piso from "./paginas/cadastrar/Piso";
import Predio from "./paginas/cadastrar/Predio";
import Sala from "./paginas/cadastrar/Sala";
import Sangue from "./paginas/cadastrar/Sangue";
import Setor from "./paginas/cadastrar/Setor";
import Status from "./paginas/cadastrar/Status";
import Tipo from "./paginas/cadastrar/Tipo";

import EditordeTexto from "./paginas/EditordeTexto";

import ListarDependentes from "./paginas/listar/ListarDependentes";
import ListarEscalas from "./paginas/listar/ListarEscalas";
import ListarEspecialidadePorProfissionalSaude from "./paginas/listar/ListarEspecialidadePorProfissionalSaude";
import ListarProfissionaisSaude from "./paginas/listar/ListarProfissionaisSaude";

import Consulta from "./paginas/recepcao/Consulta";
import ConsultaEmergencia from "./paginas/recepcao/ConsultaEmergencia";
import ListarPacientes from "./paginas/recepcao/ListarPacientes";
import MarcarConsultas from "./paginas/recepcao/MarcarConsultas";
import VerPacientesConsultaAgendada from "./paginas/recepcao/VerPacientesConsultaAgendada";

import CadastrarEscalaJISM from "./paginas/secretaria/CadastrarEscala"

import Atendimentos from "./paginas/relatorio/Atendimentos";

import { PerfilAcoes } from "./paginas/vincular/PerfilAcoes";
import { SetorFuncao } from "./paginas/vincular/SetorFuncao";
import { SetorFuncaoAcoes } from "./paginas/vincular/SetorFuncaoAcoes";
import { SubSetor } from "./paginas/vincular/SubSetor";

import { MenuLateral, Rodape, Topo } from "./componentes/pagina";
import AlterarSenha from "./paginas/AlterarSenha";
import CadastrarSistemaExterno from "./paginas/cadastrar/CadastrarSistemaExterno";
import EsqueciMinhaSenha from "./paginas/EsqueciMinhaSenha";
import RecuperarSenha from "./paginas/RecuperarSenha";
import PessoaPerfis from "./paginas/vincular/PessoaPerfis";

function verificaToken() {
    xfetch('/validaToken', {token: localStorage.getItem('tkn')}, HttpVerbo.POST)
        .then(json => {
                let valido = json.resultado
                if (!valido) {
                    localStorage.clear()
                    window.location.replace('/login')
                }
            }
        )
}

const App =  () =>  {

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

                    <Route exact path="/agendadeConsultas" component={AgendadeConsultas} />

                    <Route exact path="/agendar/consulta" component={AgendarConsulta} />
                    <Route exact path="/agendar/consultasAgendadas" component={ConsultasAgendadas} />
                    <Route exact path="/agendar/consultasAgendadasImprimir" component={ConsultasAgendadasImprimir} />

                    <Route exact path="/atendimento/listaPacientesParaAtendimento" component={ListaPacientesParaAtendimento} />
                    <Route exact path="/atendimento/listaHistoricosPacientes" component={ListaHistoricosPacientes} />
                    <Route exact path="/atendimento/pacienteEmAtendimento" component={PacienteEmAtendimento} />
                    <Route exact path="/atendimento/pacienteEmAtendimentoOdontologia" component={PacienteEmAtendimentoOdontologia} />
                    <Route exact path="/atendimento/atestadoImprimir" component={AtestadoImprimir} />
                    <Route exact path="/atendimento/receitaImprimir" component={ReceitaImprimir} />
                    <Route exact path="/atendimento/marcarConsultaMedico" component={MarcarConsultaMedico} />
                    {/* <Route exact path="/atendimento/impressos" component={Impressos} /> */}

                    <Route exact path="/cadastrar/objeto" component={Objeto} />
                    <Route exact path="/cadastrar/sangue" component={Sangue} />
                    <Route exact path="/cadastrar/especialidade" component={Especialidade} />
                    <Route exact path="/cadastrar/cadastrarEspecialidadeProfissionalSaude" component={CadastrarEspecialidadeProfissionalSaude} />
                    <Route exact path="/cadastrar/pessoa" component={Pessoa} />
                    <Route exact path="/esqueciMinhaSenha" component={EsqueciMinhaSenha}/>
                    <Route exact path="/cadastrar/predio" component={Predio} />
                    <Route exact path="/cadastrar/perfil" component={Perfil} />
                    <Route exact path="/recuperarSenha/:hash" component={RecuperarSenha}/>
                    <Route exact path="/cadastrar/tipo" component={Tipo} />
                    <Route exact path="/cadastrar/setor" component={Setor} />
                    <Route exact path="/cadastrar/funcao" component={Funcao} />
                    <Route exact path="/cadastrar/piso" component={Piso} />
                    <Route exact path="/cadastrar/menu" component={Menu} />
                    <Route exact path="/cadastrar/sala" component={Sala} />
                    <Route exact path="/cadastrar/medicamento" component={Medicamento} />
                    <Route exact path="/cadastrar/status" component={Status} />
                    <Route exact path="/cadastrar/exame" component={Exame} />
                    <Route exact path="/cadastrar/instituicaoConvenio" component={InstituicaoConvenio} />
                    <Route exact path="/cadastrar/consultorioBloco" component={ConsultorioBloco} />
                    <Route exact path="/cadastrar/dependente" component={Dependente} />
                    <Route exact path="/cadastrar/cadastrarEscala" component={CadastrarEscala} />
                    <Route exact path="/cadastrar/cadastrarSistemaExterno" component={CadastrarSistemaExterno}/>

                    <Route exact path="/editar/editarConsultorioBloco" component={ConsultorioBloco} />

                    <Route exact path="/editordeTexto" component={EditordeTexto} />

                    <Route exact path="/listar/listarDependentes" component={ListarDependentes} />
                    <Route exact path="/listar/listarEscalas" component={ListarEscalas} />
                    <Route exact path="/listar/listarEspecialidadePorProfissionalSaude" component={ListarEspecialidadePorProfissionalSaude} />
                    <Route exact path="/listar/listarProfissionaisSaude" component={ListarProfissionaisSaude} />

                    <Route exact path="/recepcao/listarPacientes" component={ListarPacientes} />
                    <Route exact path="/recepcao/marcarConsultas" component={MarcarConsultas} />
                    <Route exact path="/recepcao/verPacientesConsultaAgendada" component={VerPacientesConsultaAgendada} />
                    <Route exact path="/recepcao/consultaEmergencia" component={ConsultaEmergencia} />
                    <Route exact path="/recepcao/consulta" component={Consulta} />

                    <Route exact path="/secretaria/cadastrarEscala" component={CadastrarEscalaJISM} />

                    <Route exact path="/relatorio/atendimentos" component={Atendimentos} />

                    <Route exact path="/vincular/setorFuncao" component={SetorFuncao} />
                    <Route exact path="/vincular/setorFuncaoAcoes" component={SetorFuncaoAcoes} />
                    <Route exact path="/vincular/setorSubSetor" component={SubSetor} />
                    <Route exact path="/vincular/perfilAcoes" component={PerfilAcoes} />
                    <Route exact path="/vincular/pessoaPerfis" component={PessoaPerfis} />
                </Switch>
                <Rodape />
            </Router>
        </div>
    );
}

export default App;