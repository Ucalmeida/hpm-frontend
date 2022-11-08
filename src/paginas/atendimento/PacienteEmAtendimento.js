import {Botao, Card, EditorTexto, Pagina, Select} from "../../componentes";
import React, {useEffect, useState} from "react";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, ICONE, MSG} from "../../util/Constantes";
import ModalFormMedico from "../../componentes/modal/ModalFormMedico";
import {Tab, Tabs} from "react-bootstrap";

export default function PacienteEmAtendimento() {
    const [pessoa, setPessoa] = useState({
        idConsulta: localStorage.getItem("pacienteConsulta"),
        idPessoa: localStorage.getItem("idPessoa"),
        nmPaciente: localStorage.getItem("nmPaciente"),
        txtRelato: localStorage.getItem("relato"),
        pessoas: []
    })

    const selecionarCid = (e) => {
        pessoa.idCid = e.value;
    }

    // useEffect(() => {
    //     xfetch('/hpm/consulta/porId/' + pessoa.idConsulta, {}, HttpVerbo.GET)
    //         .then(res => res.json())
    //         .then(json => {
    //                 setPessoa({...pessoa, pessoas: json.resultado})
    //             }
    //         )
    //         .catch(err => ExibirMensagem(err.message, MSG.ERRO))
    // }, [])
    console.log("Pessoa:", pessoa);
    return (
        <Pagina titulo="Paciente em Atendimento">
            <div className="row">
                <div className="col-lg-12">
                    <Card>
                        <div className="col-lg-12">
                            <div className={"info-box"}>
                                <div className="info-box-content">
                                    <span className="info-box-text">Nome do Paciente</span>
                                    <span className="info-box-text">{pessoa.nmPaciente}</span>
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
                    <Card titulo={"Relato"}>
                        <div className={"info-box"}>
                            <div className={"info-box-content"}>
                                <span className={"info-box-text"}>{pessoa.txtRelato}</span>
                            </div>
                        </div>
                    </Card>
                    <Card titulo="Evolução">
                        <div className={"row"}>
                            <div className="col-lg-12">
                                <EditorTexto corDoBotao={BOTAO.COR.PERIGO} icone={ICONE.SALVAR} idConsulta={pessoa.idConsulta} nome={"Finalizar Consulta"} onClick/>
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
                            {/*<div className={"col-lg-4"}>*/}
                            {/*    <Select*/}
                            {/*        url={"/hpm/especialidade/" + objeto.idPessoa + "/opcoes"}*/}
                            {/*        nome={"idEspecialidade"}*/}
                            {/*        funcao={selecionarCid}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <br />
                            <br />
                        </div>
                    </Card>
                    <Card titulo={"Formulários"}>
                        <Tabs>
                            <Tab title="Atestado" eventKey="aba1">
                                <br />
                                <ModalFormMedico corDoBotao={BOTAO.COR.SUCESSO} icone={ICONE.PDF} titulo={"Atestado"} nome={"Atestado"} />
                            </Tab>
                            <Tab title="Receita" eventKey="aba2">
                                <br />
                                <ModalFormMedico corDoBotao={BOTAO.COR.INFO} icone={ICONE.PDF} titulo={"Receita"} nome={"Receita"} />
                            </Tab>
                            <Tab title="Requisição de Exames" eventKey="aba3">
                                <br />
                                <ModalFormMedico corDoBotao={BOTAO.COR.ALERTA} icone={ICONE.PDF} titulo={"Requisição de Exames"} nome={"Requisição de Exames"} />
                            </Tab>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}