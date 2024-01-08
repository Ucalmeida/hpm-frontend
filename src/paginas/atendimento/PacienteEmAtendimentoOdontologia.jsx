import React, { useEffect, useState } from "react";
import { Tab, Tabs } from 'react-bootstrap';
import { Card, Input, Pagina, Tabela } from "../../componentes";
import { PacienteEmAtendimentoOdontologiaEditor } from "../../componentes/form/PacienteEmAtendimentoOdontologiaEditor";
import { xfetch } from "../../util";
import { BOTAO, HttpVerbo, ICONE } from "../../util/Constantes";

export default function PacienteEmAtendimentoOdontologia() {
    const [objeto, setObjeto] = useState({
        consultas: []
    });

    const [atestado, setAtestado] = useState({
        atestados: []
    });

    const [consulta, setConsulta] = useState({
        id: localStorage.getItem("pacienteConsulta"),
        idPessoa: localStorage.getItem("idPessoa"),
        nmPaciente: localStorage.getItem("nmPaciente"),
        cpfPaciente: localStorage.getItem("cpfPaciente"),
        instituicao: localStorage.getItem("nmInstituicao"),
        tipoSanguineo: localStorage.getItem("nmSangue"),
        sexo: localStorage.getItem("sexo"),
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

    const listaConsultasPacientes = () => {
        xfetch("/hpm/consulta/historico/pessoa/" + consulta.idPessoa, {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(response => {
                if (typeof response !== "undefined" ? response.status === "OK" : false) {                    
                    setObjeto({...objeto, consultas: response.resultado});
                }
            })
            .catch(error => console.log(error))
    }

    const listaAtestadosPacientes = () => {
        xfetch("/hpm/consulta/atestado/historico/pessoa/" + consulta.idPessoa, {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(response => {
                console.log("Atestados:", response.resultado);
                if (typeof response !== "undefined" ? response.status === "OK" : false) {                    
                    setAtestado({...atestado, atestados: response.resultado});
                }
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        listaConsultasPacientes();
        listaAtestadosPacientes();
    }, []);

    const colunasHistorico = [
        {text: "Data Hora Atendimento"},
        {text: "Médico Especialidade"},
        {text: "Anamnese"},
        {text: "Conduta"},
        {text: "Exame Físico"}
    ]
    
    const colunasAtestados = [
        {text: "Data Hora Atendimento"},
        {text: "CID"},
        {text: "Quantidade de dias concedidos"},
        {text: "Responsável pela Concessão"}
    ]

    const dadosHistorico = () => {
        return(
            typeof objeto.consultas !== 'undefined' ? objeto.consultas.map((consulta) => {
                return ({
                    'data_hora_atendimento': consulta.dtHora,
                    'medico_especialidade': consulta.nmMedico + " - " + consulta.nmEspecialidade,
                    'anamnese': consulta.anamnese,
                    'conduta': consulta.conduta,
                    'exame_fisico': consulta.exameFisico
                })
            }) : "")
    }
    
    const dadosAtestados = () => {
        return(
            typeof atestado.atestados !== 'undefined' ? atestado.atestados.map((atestado) => {
                let listaCids = atestado.cids.length > 0 ? atestado.cids.map((cid, index) => {
                    return cid.codigo + (index < (atestado.cids.length - 1) ? ", " : "");
                }) : "";
                return ({
                    'data_hora_atendimento': atestado.consulta.dtHora,
                    'cid': listaCids,
                    'quantidade_de_dias_concedidos': atestado.qtdDiasAfastamento,
                    'responsavel_pela_concessao': atestado.consulta.nmMedico + " - " + atestado.consulta.nmEspecialidade
                })
            }) : "")
    }

    return (
        <Pagina titulo="Paciente em Atendimento">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo={"Dados do Paciente"} botaoMin>
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
                                        <div id="cpfPaciente" className="col-lg-6">
                                            <Input
                                                type="text"
                                                value={consulta.cpfPaciente}
                                                name="cpf"
                                                label="CPF"
                                                placeholder={"CPF"} disabled/>
                                        </div>
                                        <div id="instituicaoPaciente" className="col-lg-6">
                                            <Input
                                                type="text"
                                                value={consulta.instituicao}
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
                                            <span className="info-box-number">{consulta.sexo}</span>
                                        </div>
                                        <div className="info-box-content">
                                            <span className="info-box-text">Tipo Sangíneo</span>
                                            <span className="info-box-number">{consulta.tipoSanguineo}</span>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab title="Histórico Evolução" eventKey="aba3">
                                <br />
                                <div className="col-lg-12">
                                    <Card>
                                        <Tabela colunas={colunasHistorico} dados={dadosHistorico()} pageSize={5} />
                                    </Card>
                                </div>
                            </Tab>
                            <Tab title="Atestados Concedidos" eventKey="aba4">
                                <br />
                                <div className="col-lg-12">
                                    <Card>
                                        <Tabela colunas={colunasAtestados} dados={dadosAtestados()} pageSize={5} />
                                    </Card>
                                </div>
                            </Tab>
                        </Tabs>
                    </Card>
                    <Card className={"collapsed-card"} titulo="Evolução" botaoMin>
                        <div className={"row"}>
                            <div className="col-lg-12">
                                <PacienteEmAtendimentoOdontologiaEditor
                                    corDoBotao={BOTAO.COR.PERIGO}
                                    icone={ICONE.SALVAR}
                                    idConsulta={consulta.id}
                                    cids={consulta.idCids}
                                    nome={"Finalizar Consulta"}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}