import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {Form, Modal, Tab, Tabs, Container} from "react-bootstrap";
import {BOTAO, HttpVerbo} from "../../util/Constantes";
import {Botao} from "../Botao";
import {xfetch} from "../../util";
import {Input} from "../form";
import {Card} from "../card/Card";
import {Tabela} from "../tabela/Tabela";

export default function ModalFormVerHistoricoPaciente(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }

    const [objeto, setObjeto] = useState({
        consultas: []
    });

    const [atestado, setAtestado] = useState({
        atestados: []
    });
    const listaConsultasPacientes = () => {
        xfetch("/hpm/consulta/historico/pessoa/" + props.idPessoa, {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(response => {
                if (typeof response !== "undefined" ? response.status === "OK" : false) {
                    setObjeto({...objeto, consultas: response.resultado});
                }
            })
            .catch(error => console.log(error))
    }

    const listaAtestadosPacientes = () => {
        xfetch("/hpm/consulta/atestado/historico/pessoa/" + props.idPessoa, {}, HttpVerbo.GET)
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
        <>
            <Botao cor={props.corDoBotao} icone={props.icone} onClick={handleShow}>
                {props.nome}
            </Botao>
            <Modal show={show} onHide={handleClose} size={"xl"}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Card titulo={"Dados do Paciente"} botaoMin>
                                <Tabs>
                                    <Tab title="Dados Paciente" eventKey="aba1">
                                        <br/>
                                        <div className="row">
                                            <div id="dadosPaciente" className="col-lg-8">
                                                <div id="nomePaciente" className="col-lg-6">
                                                    <Input
                                                        type="text"
                                                        value={props.nomePaciente}
                                                        name="nome"
                                                        label="Nome"
                                                        placeholder="Nome" disabled required/>
                                                </div>
                                                <div id="cpfPaciente" className="col-lg-6">
                                                    <Input
                                                        type="text"
                                                        value={props.cpfPaciente}
                                                        name="cpf"
                                                        label="CPF"
                                                        placeholder={"CPF"} disabled/>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab title="Histórico Evolução" eventKey="aba2"  style={{width: "100%", overflow: "auto"}}>
                                        <br />
                                        <div className="col-lg-12">
                                            <Card>
                                                <Tabela colunas={colunasHistorico} dados={dadosHistorico()} pageSize={5} />
                                            </Card>
                                        </div>
                                    </Tab>
                                    <Tab title="Atestados Concedidos" eventKey="aba3"  style={{width: "100%", overflow: "auto"}}>
                                        <br />
                                        <div className="col-lg-12">
                                            <Card>
                                                <Tabela colunas={colunasAtestados} dados={dadosAtestados()} pageSize={5} />
                                            </Card>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </Card>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Botao cor={BOTAO.COR.SECUNDARIO} onClick={handleClose}>
                        Fechar
                    </Botao>
                </Modal.Footer>
            </Modal>
        </>
    )
}

ModalFormVerHistoricoPaciente.propTypes = {
    corDoBotao: PropTypes.string,
    icone: PropTypes.string,
    titulo: PropTypes.string,
    nome: PropTypes.string,
    texto: PropTypes.string,
    funcao: PropTypes.func,
    url: PropTypes.string,
    nomePaciente: PropTypes.string,
    cpfPaciente: PropTypes.string,
    idPessoa: PropTypes.number,
}