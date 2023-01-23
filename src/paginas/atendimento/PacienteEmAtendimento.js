import React, { useState } from "react";
import { Tab, Tabs } from 'react-bootstrap';
import { Card, Input, Pagina } from "../../componentes";
import { PacienteEmAtendimentoEditor } from '../../componentes/form/PacienteEmAtendimentoEditor';
import { BOTAO, ICONE } from "../../util/Constantes";

export default function PacienteEmAtendimento() {
    const [consulta, setConsulta] = useState({
        id: localStorage.getItem("pacienteConsulta"),
        idPessoa: localStorage.getItem("idPessoa"),
        nmPaciente: localStorage.getItem("nmPaciente"),
        dtNascimento: localStorage.getItem('dtNascimento'),
        altura: localStorage.getItem('altura'),
        peso: localStorage.getItem('peso'),
        txtRelato: localStorage.getItem("relato"),
        idade: null,
        imc: null,
        pessoas: [],
        idCids: []
    });

    let medida = {
        medidaAltura: "m",
        medidaPeso: "Kg"
    };

    const altura = Number(consulta.altura / 100);

    let calcIdade = (data) => {
        const atual = new Date();
        const dataNascimento = data.split('/');
        const anoNascimento = dataNascimento[2].split("-");
        let idade = atual.getFullYear() - anoNascimento[0];
        const m = atual.getMonth() - dataNascimento[1];
        if (m < 0 || (m === 0 && atual.getDate() < dataNascimento[0])) {
            idade--;
        }
        return idade;
    }

    let calcImc = () => {
        let peso = Number(consulta.peso);
        let imc = peso / (altura * altura);
        return imc.toFixed(2);
    }

    consulta.idade = calcIdade(consulta.dtNascimento);
    consulta.imc = calcImc();

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
                                    <span className="info-box-number">{consulta.idade}</span>
                                </div>
                                <div className="info-box-content">
                                    <span className="info-box-text">Altura do Paciente</span>
                                    <span className="info-box-number">{altura + medida.medidaAltura}</span>
                                </div>
                                <div className="info-box-content">
                                    <span className="info-box-text">Peso do Paciente</span>
                                    <span className="info-box-number">{consulta.peso + medida.medidaPeso}</span>
                                </div>
                                <div className="info-box-content">
                                    <span className="info-box-text">IMC do Paciente</span>
                                    <span className="info-box-number">{consulta.imc}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className={"collapsed-card"} titulo="Evolução" botaoMin>
                        <div className={"row"}>
                            <div className="col-lg-12">
                                <PacienteEmAtendimentoEditor
                                    corDoBotao={BOTAO.COR.PERIGO}
                                    icone={ICONE.SALVAR}
                                    idConsulta={consulta.id}
                                    cids={consulta.idCids}
                                    nome={"Finalizar Consulta"}
                                />
                            </div>
                        </div>
                    </Card>
                    <Card className={"collapsed-card"} titulo={"Dados do Paciente"} botaoMin>
                        <Tabs>
                            <Tab title="Dados Pessoais" eventKey="aba1">
                                <br/>
                                <div className="row">
                                    <div id="imagemPaciente" className="col-lg-3">
                                        <img id={"imagemDefault"}src="" alt="" />
                                    </div>
                                    <div id="dadosPaciente" className="col-lg-8">
                                        <div id="nomePaciente" className="col-lg-6">
                                            <Input
                                                type="text"
                                                value={consulta.nmPaciente}
                                                name="nome"
                                                label="Nome"
                                                placeholder="Nome" disabled required/>
                                        </div>
                                        <div id="matriculaPaciente" className="col-lg-6">
                                            <Input
                                                type="text"
                                                value={"2002070001-76"}
                                                name="matricula"
                                                label="Matrícula"
                                                placeholder="Matrícula" disabled/>
                                        </div>
                                        <div id="cpfPaciente" className="col-lg-6">
                                            <Input
                                                type="text"
                                                value={"999.999.999-99"}
                                                name="cpf"
                                                label="CPF"
                                                placeholder={"CPF"} disabled/>
                                        </div>
                                        <div id="instituicaoPaciente" className="col-lg-6">
                                            <Input
                                                type="text"
                                                value={"PMSE"}
                                                name="instituicao"
                                                label="Instituição"
                                                placeholder="Instituição" disabled/>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab title="Características Físicas" eventKey="aba2">
                                <br />
                                <div className="col-lg-12">
                                    <div className={"info-box"}>
                                        <div className="info-box-content">
                                            <span className="info-box-text">Idade do Paciente</span>
                                            <span className="info-box-number">{consulta.idade}</span>
                                        </div>
                                        <div className="info-box-content">
                                            <span className="info-box-text">Altura do Paciente</span>
                                            <span className="info-box-number">{altura + medida.medidaAltura}</span>
                                        </div>
                                        <div className="info-box-content">
                                            <span className="info-box-text">Peso do Paciente</span>
                                            <span className="info-box-number">{consulta.peso + medida.medidaPeso}</span>
                                        </div>
                                        <div className="info-box-content">
                                            <span className="info-box-text">IMC do Paciente</span>
                                            <span className="info-box-number">{consulta.imc}</span>
                                        </div>
                                        <div className="info-box-content">
                                            <span className="info-box-text">Sexo</span>
                                            <span className="info-box-number">{"Masculino"}</span>
                                        </div>
                                        <div className="info-box-content">
                                            <span className="info-box-text">Raça</span>
                                            <span className="info-box-number">{"Branca"}</span>
                                        </div>
                                        <div className="info-box-content">
                                            <span className="info-box-text">Tipo Sangíneo</span>
                                            <span className="info-box-number">{"A+"}</span>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab title="Histórico Evolução" eventKey="aba3">
                                <br />
                                <div className="col-lg-12">
                                    <div className="row">
                                        <table className={"col-lg-12"} border="1">
                                            <thead>
                                                <tr>
                                                    <td><b>Data/Hora Atendimento</b></td>
                                                    <td><b>Responsável Atendimento/Especialidade</b></td>
                                                    <td><b>Descrição Atendimento</b></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>23/01/2023 09:30</td>
                                                    <td>DRa ADRIANA MOTA CARNAUBA - CLÍNICA GERAL</td>
                                                    <td>Aqui temos um exemplo de descrição do atendimento realizado.</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {/* <div className="col-lg-6">
                                            <Input
                                                type="text"
                                                value={"23/01/2023 09:30"}
                                                name="nome"
                                                label="Data/Hora Atendimento"
                                                placeholder="Nome" disabled required />
                                        </div> */}
                                        {/* <div className="col-lg-6">
                                            <Input
                                                type="text"
                                                value={"DRa ADRIANA MOTA CARNAUBA - CLÍNICA GERAL"}
                                                name="profissionalSaude"
                                                label="Responsável Atendimento/Especialidade"
                                                placeholder={"profissionalSaude"} disabled />
                                        </div> */}
                                        {/* <div className="col-lg-12">
                                            <Input
                                                type="textarea"
                                                value={"Aqui temos um exemplo de descrição do atendimento realizado."}
                                                name="atendimento"
                                                label="Descrição Atendimento"
                                                placeholder="Descrição atendimento" disabled />
                                        </div> */}
                                    </div>
                                </div>
                            </Tab>
                            <Tab title="Atestados Concedidos" eventKey="aba4">
                                <br />
                                <div className="col-lg-12">
                                    <div className="row">
                                        <table className={"col-lg-12"} border="1">
                                            <thead>
                                                <tr>
                                                    <td><b>Data Atendimento</b></td>
                                                    <td><b>CIDs</b></td>
                                                    <td><b>Quantidade de Dias Concedidos</b></td>
                                                    <td><b>Responsável pela Concessão</b></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>23/01/2023</td>
                                                    <td>Z23.0, M43.6, M22.4</td>
                                                    <td>3</td>
                                                    <td>DRa ADRIANA MOTA CARNAUBA</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {/* <div className="col-lg-6">
                                            <Input
                                                type="text"
                                                value={"23/01/2023 09:30"}
                                                name="nome"
                                                label="Data Atendimento"
                                                placeholder="Nome" disabled required />
                                        </div>
                                        <div className="col-lg-6">
                                            <Input
                                                type="text"
                                                value={"Z23.0, M43.6, M22.4"}
                                                name="cids"
                                                label="CID"
                                                placeholder={"cids"} disabled />
                                        </div>
                                        <div className="col-lg-4">
                                            <Input
                                                type="textarea"
                                                value={"3"}
                                                name="atendimento"
                                                label="Quantidade de Dias Concedidos"
                                                placeholder="Descrição atendimento" disabled />
                                        </div>
                                        <div className="col-lg-8">
                                            <Input
                                                type="text"
                                                value={"DRa ADRIANA MOTA CARNAUBA"}
                                                name="profissionalSaude"
                                                label="Responsável pela Concessão"
                                                placeholder={"profissionalSaude"} disabled />
                                        </div> */}
                                    </div>
                                </div>
                            </Tab>
                            <Tab title="Estados Preexistentes" eventKey="aba5">
                                <br />
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <Input
                                                type="textarea"
                                                value={"Alcoolismo, Diabetes, Hipertensão, Cardiopatia, Tabagismo, Lesões Ósseas(Fraturas)"}
                                                name="atendimento"
                                                label="Estados Preexistentes"
                                                placeholder="Descrição atendimento" disabled />
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab title="Alergias" eventKey="aba6">
                                <br />
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <Input
                                                type="text"
                                                value={"Sulfa"}
                                                name="nome"
                                                label="Medicamentos"
                                                placeholder="Medicamentos" disabled required />
                                        </div>
                                        <div className="col-lg-6">
                                            <Input
                                                type="text"
                                                value={"Polvo, Camarão"}
                                                name="alimentos"
                                                label="Alimentos"
                                                placeholder={"alimentos"} disabled />
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}