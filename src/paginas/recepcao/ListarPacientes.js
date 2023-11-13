import React, { useEffect, useState } from "react";
import { Select } from "../../componentes/form";
import { ExibirMensagem, xfetch } from "../../util";
import { BOTAO, HttpVerbo, MSG } from "../../util/Constantes";
import { Botao, Card, Pagina, Tabela } from "../../componentes";

export default function ListarPacientes() {
    const [objeto, setObjeto] = useState({});


    const [consultorio, setConsultorio] = useState({
        "idConsultorioBloco": null,
        "idStatus": null
    });

    let consultaSelecionada = {
        idConsulta: '',
        idStatus: ''
    }

    const handleBtnConfirmar = async (consultaId, statusId) => {
        consultaSelecionada.idConsulta = consultaId;
        consultaSelecionada.idStatus = statusId;
        await xfetch('/hpm/consulta/alterar-status', consultaSelecionada, HttpVerbo.POST)
            .then(json => {
                if (typeof json !== "undefined" ? json.status === "OK" : false) {
                    ExibirMensagem('Consulta Alterada!', MSG.SUCESSO, '', '', '', '', listarPacientesPorData())
                } else {
                    ExibirMensagem(json.message, MSG.ERRO)
                }
            }
            )
    }

    const handleBtnCancelar = async (consultaId, statusId) => {
        consultaSelecionada.idConsulta = consultaId;
        consultaSelecionada.idStatus = statusId;
        await xfetch('/hpm/consulta/alterar-status', consultaSelecionada, HttpVerbo.POST)
            .then(json => {
                if (json.status === "OK") {
                    ExibirMensagem('Consulta Cancelada!', MSG.SUCESSO, '', '', '', '', listarPacientesPorData())
                } else {
                    ExibirMensagem(json.message, MSG.ERRO)
                }
            }
            )
    }

    const selecionarEspecialidade = (e) => {
        const novaEspecialidade = e.value;
        setObjeto({
            idEspecialidade: novaEspecialidade,
            profissionais: [],
            consultoriosBloco: [],
            consultas: [],
        });
    }

    const selecionarProfissionalSaude = (e) => {
        objeto.idProfissionalSaude = e.target.value;
        listarDatasPorEspecialidadeProfissionalSaude();
    }

    const selecionarConsultorioBloco = (e) => {
        consultorio.idConsultorioBloco = Number(e.target.value);
        if (consultorio.idStatus !== null) {
            listarPacientesPorData();
        }
    }

    const selecionarStatus = (e) => {
        consultorio.idStatus = Number(e.value);
        if (consultorio.idConsultorioBloco !== null) {
            listarPacientesPorData();
        } else {
            ExibirMensagem("Selecione uma Data", MSG.ALERTA);
        }
    }

    const listarProfissionalPorEspecialidade = () => {
        if (typeof objeto.idEspecialidade !== "undefined") {
            xfetch("/hpm/profissionalSaude/" + objeto.idEspecialidade + "/opcoes", {}, HttpVerbo.GET)
                .then((res) => res.json())
                .then((json) => {
                    if (json.resultado) {
                        setObjeto({ ...objeto, profissionais: json.resultado });
                    } else {
                        // Limpar a lista de profissionais se não houver resultado
                        setObjeto({ ...objeto, profissionais: [] });
                    }
                });
        }
    };

    const listarDatasPorEspecialidadeProfissionalSaude = () => {
        setObjeto({ ...objeto, consultoriosBloco: [] })
        xfetch('/hpm/consultorioBloco/' + objeto.idEspecialidade + '/' + objeto.idProfissionalSaude + '/opcoes', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                setObjeto({ ...objeto, consultoriosBloco: json.resultado })
            }
            )
    }

    const listarPacientesPorData = () => {
        xfetch('/hpm/consulta/pesquisar/consultorio-status', consultorio, HttpVerbo.POST)
            .then(response => {
                if (response.status === "OK") {
                    setObjeto({ ...objeto, consultas: response.resultado })
                } else {
                    setObjeto({ ...objeto, consultas: [] })
                    ExibirMensagem("Não existe resultados para essa pesquisa!", MSG.ALERTA)
                }
            }
            )
            .catch(error => console.log(error))
    }

    useEffect(() => {
        listarProfissionalPorEspecialidade();
    }, [objeto.idEspecialidade]);

    const colunas = [
        { text: "Paciente" },
        { text: "Telefone" },
        { text: "Atendimento" },
        { text: "Ordem" },
        { text: "Ações" }
    ]

    const dados = () => {
        return (
            typeof objeto.consultas !== 'undefined' ? objeto.consultas.map((consulta, indice) => {
                let corBotao = BOTAO.COR.PRIMARIO;
                let nomeBotao = 'Confirmar';
                let isDesabilitado = false;
                console.log("Status ", consulta.nmStatus);
                if (consulta.nmStatus === 'Confirmada') {
                    corBotao = BOTAO.COR.SUCESSO;
                    nomeBotao = 'Confirmada';
                    isDesabilitado = true;
                } else if (consulta.nmStatus !== 'Agendada') {
                    isDesabilitado = true;
                }
                return ({
                    'id': consulta.id,
                    'paciente': consulta.nmPaciente,
                    'telefone': consulta.nmCelular,
                    'atendimento': consulta.nmStatus,
                    'ordem': consulta.numOrdem,
                    'acoes': <div>
                        <Botao cor={corBotao} onClick={() => handleBtnConfirmar(consulta.id, Number("6"))} value={consulta.id} disabled={isDesabilitado}>{nomeBotao}</Botao>
                        <Botao cor={BOTAO.COR.ALERTA} onClick={() => handleBtnCancelar(consulta.id, Number("8"))} value={consulta.id} disabled={isDesabilitado}>Cancelar</Botao>
                    </div>
                })
            }) : ''
        )
    }

    console.log(objeto);

    let consultaBloco = objeto.consultoriosBloco;

    return (
        <Pagina titulo={"Listar Pacientes"}>
            <div className={"row"}>
                <div className={"col-lg-12"}>
                    <Card titulo="Especialidade Médico">
                        <div className={"row"}>
                            <div className={"col-lg-3"}>
                                <label>Selecionar Especialidade</label>
                                <Select
                                    url={"/hpm/especialidade/opcoes"}
                                    nome={"idEspecialidade"}
                                    funcao={selecionarEspecialidade}
                                />
                            </div>
                            <div className={"col-lg-3"}>
                                <label>Profissional</label>
                                <select
                                    className="form-control"
                                    onChange={selecionarProfissionalSaude}
                                    name="idProfissionalSaude">
                                    <option hidden>Selecione...</option>
                                    {(typeof objeto.profissionais !== 'undefined') ? objeto.profissionais.map((v, k) => {
                                        return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>
                                    }) : ''}
                                </select>
                            </div>
                            <div className="col-lg-3">
                                <label>Data - Hora</label>
                                <br />
                                <select
                                    className="form-control"
                                    name="idConsultorioBloco"
                                    value={objeto.idConsultorioBloco}
                                    onChange={selecionarConsultorioBloco}>
                                    <option hidden>Selecione...</option>
                                    {typeof (consultaBloco) !== 'undefined' ? consultaBloco.map((v, k) => {
                                        return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>
                                    }) : ''}
                                </select>
                            </div>
                            <div className="col-lg-3">
                                <label>Status</label>
                                <br />
                                <Select
                                    url={"/hpm/status/objeto-opcoes/" + 20}
                                    nome={"idStatus"}
                                    funcao={selecionarStatus}
                                />
                            </div>
                        </div>
                    </Card>
                    <Card titulo="Lista de Pacientes">
                        <Tabela colunas={colunas} dados={dados()} pageSize={5} />
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}