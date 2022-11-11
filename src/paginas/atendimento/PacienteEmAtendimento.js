import {Autocompletar, Botao, Card, EditorTexto, Input, Pagina, Select} from "../../componentes";
import React, {useEffect, useState} from "react";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, ICONE, MSG} from "../../util/Constantes";
import ModalFormMedico from "../../componentes/modal/ModalFormMedico";
import {Tab, Tabs} from "react-bootstrap";

export default function PacienteEmAtendimento() {
    const [consulta, setConsulta] = useState({
        id: localStorage.getItem("pacienteConsulta"),
        idPessoa: localStorage.getItem("idPessoa"),
        nmPaciente: localStorage.getItem("nmPaciente"),
        txtRelato: localStorage.getItem("relato"),
        pessoas: [],
        cid: null
    })

    // const handleCID = (e) => {
    //     const idCid = document.getElementById("idcid").value;
    //     consulta.cid = idCid;
    // }

    // const handleCID = (e) => {
    //     const cids = e.map((item) => { return item.value });
    //     console.log("CIDs:", cids);
    //     setCid({...cid, cids : cids});
    // }

    const handleCID = (e) => {
        const idCid = e.value;
        setConsulta({...consulta, cid : idCid});
    }

    console.log("Consulta:", consulta);
    return (
        <Pagina titulo="Paciente em Atendimento">
            <div className="row">
                <div className="col-lg-12">
                    <Card>
                        <div className="col-lg-12">
                            <div className={"info-box"}>
                                <div className="info-box-content">
                                    <span className="info-box-text">Nome do Paciente</span>
                                    <span className="info-box-text">{consulta.nmPaciente}</span>
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
                                <span className={"info-box-text"}>{consulta.txtRelato}</span>
                            </div>
                        </div>
                    </Card>
                    <Card titulo="Evolução">
                        <div className={"row"}>
                            <div className="col-lg-12">
                                <EditorTexto
                                    corDoBotao={BOTAO.COR.PERIGO}
                                    icone={ICONE.SALVAR}
                                    idConsulta={consulta.id}
                                    idCid={consulta.cid}
                                    nome={"Finalizar Consulta"}
                                />
                            </div>
                        </div>
                    </Card>
                    <Card titulo="CID">
                        <div className={"row"}>
                            <div className="col-lg-12">
                                {/*<Autocompletar*/}
                                {/*    name="cid"*/}
                                {/*    url={"/hpm/cid/por-nome/"}*/}
                                {/*    label="Digite o CID:"*/}
                                {/*    placeholder="Nome ou código aqui"*/}
                                {/*    tamanho={6}*/}
                                {/*    retorno={handleCID} />*/}
                                {/*<Select*/}
                                {/*    placeholder={"CID"}*/}
                                {/*    funcao={handleCID}*/}
                                {/*    nome={"cids"}*/}
                                {/*    multiplo={true}*/}
                                {/*    url={"/hpm/cid/"}/>*/}
                                <Select
                                    placeholder={"CID"}
                                    funcao={handleCID}
                                    nome={"cid"}
                                    url={"/hpm/cid"}/>
                            </div>
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