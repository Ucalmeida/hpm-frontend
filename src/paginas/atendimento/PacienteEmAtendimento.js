import {Botao, Card, EditorTexto, Pagina} from "../../componentes";
import React, {useEffect, useState} from "react";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, ICONE, MSG} from "../../util/Constantes";
import ModalFormMedico from "../../componentes/modal/ModalFormMedico";

export default function PacienteEmAtendimento() {
    const [pessoa, setPessoa] = useState({
        idConsulta: localStorage.getItem("pacienteConsulta"),
        pessoas: []
    })

    let consultaSelecionada = {
        idConsulta: pessoa.idConsulta,
        idStatus: Number("20")
    }

    const handleBtnFinalizarConsulta = async (consultaId, statusId) => {
        consultaSelecionada.idConsulta = consultaId;
        consultaSelecionada.idStatus = statusId;
        await xfetch('/hpm/consulta/alterar-status', consultaSelecionada, HttpVerbo.POST)
            .then( json => {
                    // if (typeof json.status !== 'undefined' ? "OK" : false) {
                        ExibirMensagem('Consulta Finalizada com Sucesso!', MSG.SUCESSO);
                        window.close();
                    // }
                }
            )
    }

    useEffect(() => {
        xfetch('/hpm/consulta/alterar-status', consultaSelecionada, HttpVerbo.POST)
            .then( json => {
                    // if (typeof json.status !== 'undefined' ? "OK" : false) {
                    //     ExibirMensagem('Consulta iniciada.', MSG.SUCESSO)
                    // }
                }
            )
    }, [])

    useEffect(() => {
        xfetch('/hpm/pessoa/porId/' + pessoa.idConsulta, {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setPessoa({...pessoa, pessoas: json.resultado})
                }
            )
            .catch(err => ExibirMensagem(err.message, MSG.ERRO))
    }, [])

    return (
        <Pagina titulo="Paciente em Atendimento">
            <div className="row">
                <div className="col-lg-12">
                    <Card>
                        <div className="col-lg-12">
                            <div className={"info-box"}>
                                <div className="info-box-content">
                                    <span className="info-box-text">Nome do Paciente</span>
                                    <span className="info-box-number">{pessoa.pessoas.nome}</span>
                                </div>
                                <div className="info-box-content">
                                    <span className="info-box-text">Idade do Paciente</span>
                                    <span className="info-box-number">{42}</span>
                                </div>
                                <div className="info-box-content">
                                    <span className="info-box-text">Altura do Paciente</span>
                                    <span className="info-box-number">{1.75}</span>
                                </div>
                                <div className="info-box-content">
                                    <span className="info-box-text">Peso do Paciente</span>
                                    <span className="info-box-number">{"90kg"}</span>
                                </div>
                                <div className="info-box-content">
                                    <span className="info-box-text">IMC do Paciente</span>
                                    <span className="info-box-number">{25}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card titulo="Evolução">
                        <div className={"row"}>
                            <div className="col-lg-12">
                                <EditorTexto />
                            </div>
                        </div>
                    </Card>
                    <Card titulo="CID">
                        <div className={"row"}>
                            <select className={"form-control col-lg-12"}>
                                <option>Selecione...</option>
                                <option>CID1</option>
                                <option>CID2</option>
                                <option>CID3</option>
                            </select>
                            <br />
                            <br />
                            <div className={"form-group"}>
                                <ModalFormMedico corDoBotao={BOTAO.COR.SUCESSO} icone={ICONE.PDF} titulo={"Atestado"} nome={"Atestado"} />
                                <ModalFormMedico corDoBotao={BOTAO.COR.INFO} icone={ICONE.PDF} titulo={"Receita"} nome={"Receita"} />
                                <ModalFormMedico corDoBotao={BOTAO.COR.ALERTA} icone={ICONE.PDF} titulo={"Requisição de Exames"} nome={"Requisição de Exames"} />
                                <Botao cor={BOTAO.COR.PERIGO} icone={ICONE.SALVAR} onClick={() => handleBtnFinalizarConsulta(pessoa.idConsulta, Number("20"))}>Finalizar Consulta</Botao>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}