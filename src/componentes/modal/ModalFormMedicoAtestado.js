import React, {useState} from "react";
import {Botao} from "../Botao";
import PropTypes from "prop-types";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";
import {Form, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import logoHPM from "../../img/brasoes/brasao_hpm.png";
import {Input} from "../form";
import {ExibirMensagem, xfetch} from "../../util";

export default function ModalFormMedicoAtestado(props) {
    const [show, setShow] = useState(false);

    const [atestado, setAtestado] = useState({
        idConsulta: localStorage.getItem("pacienteConsulta"),
        texto: null,
        blAcompanhante: false,
    });

    const [consulta, setConsulta] = useState({
        diasAfastado: 0,
        mostraCid: false
    });

    const handleCadastrar = () => {
        atestado.texto = "Atesto, para os devidos fins, a pedido do interessado, que " + localStorage.getItem("nmPaciente") + ", " +
                "portador(a) do CPF: " + localStorage.getItem("cpfPaciente") + ", foi submetido a consulta médica nesta data, " +
                "no horário de " + new Date().toLocaleTimeString() + " sendo portador da afecção: " + localStorage.getItem("arrayCodigosCids") + "." +
                "Em decorrência, deverá permanecer afastado de suas atividades laborativas por um período de " + consulta.diasAfastado + " dia(s), " +
                "a partir desta data. Aracaju, " + new Date().toLocaleDateString();

        xfetch('/hpm/consulta/atestado/cadastrar', atestado, HttpVerbo.POST)
            .then(json => {
                if(typeof json !== "undefined" ? json.status === "OK" : false) {
                    ExibirMensagem('Atestado Salvo Com Sucesso!', MSG.SUCESSO)
                }
            })
            .catch(e => console.log(e))
        handleImprimir(atestado)
    }

    function handleImprimir(atestado) {
        localStorage.setItem('texto', atestado.texto);
        window.open("/atendimento/atestadoImprimir");
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        let {name, value} = e.target;
        setConsulta({...consulta, [name]: value});
    }

    return (
        <>
            <Botao cor={props.corDoBotao} icone={props.icone} onClick={handleShow}>{props.nome}</Botao>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="login-logo">
                        <Link to="/">
                            <img src={logoHPM}  alt={"Brasão"}/>
                        </Link>
                    </div>
                    <Form>
                        <div className={"col-lg-12"}>
                            <Input
                                type="number"
                                value={consulta.diasAfastado}
                                onChange={handleChange}
                                name="diasAfastado"
                                label="Dias afastamento"
                            />
                        </div>
                        <div className={"col-lg-12"}>
                            <Input
                                type="checkbox"
                                value={consulta.mostraCid}
                                onChange={handleChange}
                                name="mostraCid"
                                label="Deve mostrar o Cid?"
                            />
                        </div>
                        <p>
                            Atesto, para os devidos fins, a pedido do interessado, que <b>{localStorage.getItem("nmPaciente")}</b>,
                            portador(a) do CPF: <b>{localStorage.getItem("cpfPaciente")}</b>, foi submetido a consulta médica nesta data,
                            no horário de <b>{new Date().toLocaleTimeString()}</b> sendo portador da afecção: <span id={"codigosCid"}><b>{localStorage.getItem("arrayCodigosCids")}</b></span>.
                            Em decorrência, deverá permanecer afastado de suas atividades laborativas por um período de <b>{consulta.diasAfastado}</b> dias,
                            a partir desta data. Aracaju, <b>{new Date().toLocaleDateString()}</b>
                        </p>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Botao cor={BOTAO.COR.SECUNDARIO} onClick={handleClose}>
                        Fechar
                    </Botao>
                    <Botao cor={BOTAO.COR.PRIMARIO} onClick={handleCadastrar}>
                        Salvar Mudanças
                    </Botao>
                </Modal.Footer>
            </Modal>
        </>
    )
}

ModalFormMedicoAtestado.propTypes = {
    corDoBotao: PropTypes.string,
    icone: PropTypes.string,
    titulo: PropTypes.string,
    nome: PropTypes.string,
    texto: PropTypes.string,
    funcao: PropTypes.func,
}