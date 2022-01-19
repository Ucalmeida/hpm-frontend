import React, {useEffect, useState} from "react";
import {Select} from "../../componentes/form";
import {xfetch} from "../../util";
import {HttpVerbo} from "../../util/Constantes";
import {Botao, Card, Pagina, Tabela} from "../../componentes";

export default function ListarPacientes() {
    const [objeto, setObjeto] = useState({});

    const selecionarEspecialidade = (e) => {
        setObjeto({...objeto, idEspecialidade: e.value});
    }

    const selecionarProfissionalSaude = (e) => {
        objeto.idProfissionalSaude = e.target.value;
        listarDatasPorEspecialidadeProfissionalSaude();
        console.log("Profissional Selecionado:", e.target.value);
    }

    const selecionarConsultorioBloco = (e) => {
        objeto.idConsultorioBloco = e.target.value;
        listarPacientesPorEspecialidadeProfissionalData();
        console.log("Consultório Selecionado:", objeto.idConsultorioBloco);
    }

    const listarProfissionalPorEspecialidade = () => {
        console.log("Especialidade:", objeto.idEspecialidade);
        xfetch('/hpm/profissionalSaude/' + objeto.idEspecialidade + '/opcoes',{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, profissionais: json.resultado});
                }
            )
    }

    const listarDatasPorEspecialidadeProfissionalSaude = () => {
        setObjeto({...objeto, consultoriosBloco: []})
        xfetch('/hpm/consultorioBloco/' + objeto.idEspecialidade + '/' + objeto.idProfissionalSaude + '/opcoes', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, consultoriosBloco: json.resultado})
                }
            )
    }

    const listarPacientesPorEspecialidadeProfissionalData = () => {
        xfetch('/hpm/consulta/agendadas/' + objeto.idEspecialidade + "/" + objeto.idProfissionalSaude + "/" + objeto.idConsultorioBloco, {}, HttpVerbo.GET)
            .then(response => response.json())
            .then(json => {setObjeto({...objeto, consultas: json.resultado})})
    }

    useEffect( () => {
        listarProfissionalPorEspecialidade();
    }, [objeto.idEspecialidade]);

    const colunas = [
        {text: "Paciente"},
        {text: "Telefone"},
        {text: "Atendimento" },
        {text: "Ordem"},
        {text: "Ações" }
    ]

    const dados = () => {
        return(
            typeof(objeto.consultas) !== 'undefined' ? objeto.consultas.map((consulta) => {
                return({
                    'id': consulta.valor,
                    'paciente': consulta.nmPaciente,
                    'telefone': consulta.telefone,
                    'atendimento': consulta.status,
                    'acoes': <div>
                                <Botao>Confirmado</Botao>
                                <Botao>Cancelar</Botao>
                            </div>
                })
            }) : ''
        )
    }

    let consultaBloco = objeto.consultoriosBloco;
    console.log("Bloco:", consultaBloco);
    console.log("Consultas:", objeto.consultas);
    console.log("Profissionais:", objeto.profissionais);

    return (
        <Pagina titulo={"Listar Pacientes"}>
            <div className={"row"}>
                <div className={"col-lg-12"}>
                    <Card titulo="Especialidade Médico">
                        <div className={"row"}>
                            <div className={"col-lg-4"}>
                                <label>Selecionar Especialidade</label>
                                <Select
                                    url={"/hpm/especialidade/opcoes"}
                                    nome={"idEspecialidade"}
                                    funcao={selecionarEspecialidade}
                                />
                            </div>
                            <div className={"col-lg-4"}>
                                <label>Profissional</label>
                                <select
                                    className="form-control"
                                    onChange={selecionarProfissionalSaude}
                                    name="idProfissionalSaude">
                                    <option hidden>Selecione...</option>
                                    {typeof objeto.profissionais != 'undefined' ? objeto.profissionais.map((v, k) => {
                                        return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>
                                    }) : ''}
                                </select>
                            </div>
                            <div className="col-lg-4">
                                <label>Data - Hora</label>
                                <br/>
                                <select
                                    className="form-control"
                                    name="idConsultorioBloco"
                                    value={objeto.idConsultorioBloco}
                                    onChange={selecionarConsultorioBloco}>
                                    <option hidden>Selecione...</option>
                                    {typeof(consultaBloco) !== 'undefined' ? consultaBloco.map((v, k) => {
                                        return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>
                                    }) : ''}
                                </select>
                            </div>
                        </div>
                    </Card>
                    <Card titulo="Lista de Pacientes">
                        <Tabela colunas={colunas} dados={dados()} />
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}