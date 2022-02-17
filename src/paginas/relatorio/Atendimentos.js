import React, {useEffect, useState} from "react";
import {BotaoImprimir, Card, Pagina, Select, Tabela} from "../../componentes";
import {xfetch} from "../../util";
import {HttpVerbo} from "../../util/Constantes";

export default function Atendimentos(){
    const [objeto, setObjeto] = useState({
        dtInicial: null,
        dtFinal: null,
        idStatus: null,
        idEspecialidade: null,
        idProfissionalSaude: null,
    })

    const [list, setList] = useState({
        profissionais:[]
    })

    const selecionarDtInicial = (e) => {
       objeto.dtInicial = e.target.value;
    }

    const selecionarDtFinal = (e) => {
        objeto.dtFinal = e.target.value;
    }

    const selecionarStatus = (e) => {
        objeto.idStatus = e.value;
    }

    const selecionarEspecialidade = (e) => {
        objeto.idEspecialidade = e.value;
        limparCampo('idProfissionalSaude');
        listarProfissionalPorEspecialidade();
    }

    const selecionarProfissionalSaude = (e) => {
        objeto.idProfissionalSaude = e.target.value;
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

        xfetch('/hpm/consulta/opcoes', objeto, HttpVerbo.GET)
            .then(response => response.json())
            .then(json => {
                    setObjeto({...objeto, consultas: json.resultado})
                }
            )
    }

    const colunas = [
        {text: "Data - Hora"},
        {text: "Status" },
        {text: "Especialidade" },
        {text: "Profissional"}
    ]

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
                                    name="dtInicial"
                                    onChange={selecionarDtInicial}
                                />
                            </div>
                            <div className={"col-lg-3"}>
                                <label>Data Final</label>
                                <input
                                    className="form-control"
                                    type="datetime-local"
                                    name="dtFinal"
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
                                    name="idProfissionalSaude">
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
                        <Tabela colunas={colunas} dados="" />
                    </Card>
                </div>
            </div>
        </Pagina>
    )
}