import React, {useState} from "react";
import {Botao} from "../Botao";
import PropTypes from "prop-types";
import {BOTAO} from "../../util/Constantes";
import {Form, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import logoHPM from "../../img/brasoes/brasao_hpm.png";

export default function ModalFormMedico(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nome do Paciente</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Aqui vem do banco de dados o nome do paciente..."
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Exemplo de área de texto</Form.Label>
                            <Form.Control as="textarea" rows={6} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Botao cor={BOTAO.COR.SECUNDARIO} onClick={handleClose}>
                        Fechar
                    </Botao>
                    <Botao cor={BOTAO.COR.PRIMARIO} onClick={handleClose}>
                        Salvar Mudanças
                    </Botao>
                </Modal.Footer>
            </Modal>
        </>
    )
}

ModalFormMedico.propTypes = {
    corDoBotao: PropTypes.string,
    icone: PropTypes.string,
    titulo: PropTypes.string,
    nome: PropTypes.string,
    funcao: PropTypes.func,
}