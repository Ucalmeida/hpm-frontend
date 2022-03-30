import React, {useEffect, useState} from "react";
import {Botao, BotaoImprimir, Card, Pagina, Select, Tabela} from "../../componentes";
import {xfetch} from "../../util";
import {BOTAO, HttpVerbo} from "../../util/Constantes";

export default function Atendimentos(){
    const [objeto, setObjeto] = useState({
        dataInicial: null,
        dataFinal: null,
        idStatus: null,
        idEspecialidade: null,
        idProfissionalSaude: null,
    })

    const [aux, setAux] = useState({
        dataInicial: null,
        dataFinal: null,
        idStatus: null,
        idEspecialidade: null,
        idProfissionalSaude: null,
    })

    const [list, setList] = useState({
        profissionais:[],
        consultas:[]
    })

    const selecionarDtInicial = (e) => {
        objeto.dataInicial = e.target.value;
        aux.dataInicial = objeto.dataInicial;
    }

    const selecionarDtFinal = (e) => {
        objeto.dataFinal = e.target.value;
        aux.dataFinal = objeto.dataFinal;
    }

    const selecionarStatus = (e) => {
        objeto.idStatus = e.value;
        aux.idStatus = e.value
    }

    const selecionarEspecialidade = (e) => {
        objeto.idEspecialidade = e.value;
        aux.idEspecialidade = e.value;
        limparCampo('idProfissionalSaude');
        listarProfissionalPorEspecialidade();
    }

    const selecionarProfissionalSaude = (e) => {
        objeto.idProfissionalSaude = e.target.value;
        aux.idProfissionalSaude = e.target.value;
    }

    const listarProfissionalPorEspecialidade = () => {
        if(typeof objeto.idEspecialidade !== 'undefined') {
            xfetch('/hpm/profissionalSaude/' + objeto.idEspecialidade + '/opcoes',{}, HttpVerbo.GET)
                .then(res => res.json())
                .then(json => {
                        setObjeto({...list, profissionais: json.resultado});
                    }
                )
        }
    }

    const limparCampo = (id) => {
        document.getElementById(id).value = '';
    }

    const listarConsultas = () => {
        xfetch('/hpm/consulta/relatorio/atendimentos', aux, HttpVerbo.POST)
            .then(response => response.json())
            .then(json => {
                    setList({...list, consultas: json.resultado})
                }
            )
    }

    const colunas = [
        {text: "Data - Hora"},
        {text: "Status" },
        {text: "Especialidade" },
        {text: "Profissional"}
    ]

    const dados = () => {
        return(
            typeof list.consultas !== 'undefined' ? list.consultas.map((consulta, indice) => {
                return ({
                    'id': consulta.id,
                    'data - hora': consulta.dtHora,
                    'status': consulta.nmStatus,
                    'especialidade': consulta.nmEspecialidade,
                    'profissional': consulta.nmMedico
                })
            }) : ''
        )
    }

    return(
        <Pagina titulo="Atendimentos">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Pesquisa">
                        <div className={"row"}>
                            <div className={"col-lg-3"}>
                                <label>Data Inicial</label>
                                <input
                                    className="form-control"
                                    type="datetime-local"
                                    required={true}
                                    name="dataInicial"
                                    onChange={selecionarDtInicial}
                                />
                            </div>
                            <div className={"col-lg-3"}>
                                <label>Data Final</label>
                                <input
                                    className="form-control"
                                    type="datetime-local"
                                    required={true}
                                    name="dataFinal"
                                    onChange={selecionarDtFinal}
                                />
                            </div>
                            <div className={"col-lg-2"}>
                                <label>Status</label>
                                <Select
                                    url={"/hpm/status/objeto-opcoes/20"}
                                    nome={"idStatus"}
                                    funcao={selecionarStatus}
                                />
                            </div>
                            <div className={"col-lg-2"}>
                                <label>Especialidade</label>
                                <Select
                                    url={"/hpm/especialidade/opcoes"}
                                    nome={"idEspecialidade"}
                                    funcao={selecionarEspecialidade}
                                />
                            </div>
                            <div className={"col-lg-2"}>
                                <label>Profissional</label>
                                <select
                                    className="form-control"
                                    id="idProfissionalSaude"
                                    onChange={selecionarProfissionalSaude}
                                    name="idProfSaude">
                                    <option hidden>Selecione...</option>
                                    {(typeof objeto.profissionais !== 'undefined') ? objeto.profissionais.map((v, k) => {
                                        return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>
                                    }) : ''}
                                </select>
                            </div>
                        </div>
                        <br/>
                        <center>
                            <div className="col-lg-2">
                                <BotaoImprimir onClick={listarConsultas}>
                                    Listar Consultas
                                </BotaoImprimir>
                            </div>
                        </center>
                    </Card>
                </div>
                <div className="col-lg-12">
                    <Card titulo="Lista de Consultas">
                        <Tabela colunas={colunas} dados={dados()} />
                    </Card>
                </div>
            </div>
        </Pagina>
    )
}