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

    const [exibe, setExibe] = useState(false);

    const [textoCid, setTextoCid] = useState("");

    const [consulta, setConsulta] = useState({
        diasAfastado: 0,
        mostraCid: false
    });

    const [atestado, setAtestado] = useState({
        idConsulta: Number(localStorage.getItem("pacienteConsulta")),
        texto: null,
        blAcompanhante: false,
        qtdDiasAfastamento: 0
    });

    const handleCadastrar = () => {
        atestado.texto = "Atesto, para os devidos fins, a pedido do interessado, que " + localStorage.getItem("nmPaciente") + ", " +
                "portador(a) do CPF: " + localStorage.getItem("cpfPaciente") + ", foi submetido a consulta médica nesta data, " +
                "no horário de " + new Date().toLocaleTimeString() + textoCid + ". " +
                "Em decorrência, deverá permanecer afastado de suas atividades laborativas por um período de " + consulta.diasAfastado + " dia(s), " +
                "a partir desta data. Aracaju, " + new Date().toLocaleDateString();
        atestado.qtdDiasAfastamento = consulta.diasAfastado;

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

    const togglerCidCheck = (e) => {
        setExibe(!exibe);
        handleTexto();
    }

    const handleTexto = (e) => {
        if (exibe) {
            setTextoCid("");
        }
        if (!exibe) {
            setTextoCid(" sendo portador da afecção: " + localStorage.getItem("arrayCodigosCids"));
        }
        console.log("Exibe:", exibe);
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
                        <div className={"row col-lg-12"}>
                                <Input
                                    type="number"
                                    value={consulta.diasAfastado}
                                    onChange={handleChange}
                                    name="diasAfastado"
                                    label="Dias afastamento"
                                />
                                <input
                                    id="cidCheck"
                                    type="checkbox"
                                    style={{height: "10px", marginTop: "2.7em", marginLeft:"0.5em"}}
                                    onClick={togglerCidCheck}
                                    name="exibirCid"
                                    checked={exibe}/>
                                <label className="form-check-label" htmlFor="cidCheck" style={{height: "20px", marginTop: "2.2em", marginLeft:"0.1em"}}><b>Deve mostrar o CID?</b></label>
                        </div>
                        <p>
                            Atesto, para os devidos fins, a pedido do interessado, que <b>{localStorage.getItem("nmPaciente")}</b>,
                            portador(a) do CPF: <b>{localStorage.getItem("cpfPaciente")}</b>, foi submetido a consulta médica nesta data,
                            no horário de <b>{new Date().toLocaleTimeString()}</b> <span>{textoCid}</span>.<p> </p>
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
                        Imprimir
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