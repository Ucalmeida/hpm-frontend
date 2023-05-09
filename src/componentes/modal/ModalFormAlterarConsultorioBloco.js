import PropTypes from "prop-types";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { ExibirMensagem, xfetch } from '../../util';
import { BOTAO, HttpVerbo, MSG } from "../../util/Constantes";
import { Botao } from "../Botao";

export default function ModalFormAlterarConsultorioBloco(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCadastrar = () => {
        enviar();
        setShow(false);
    }

    const enviar = (e) => {
        if (props.verificador.mesInicio === props.verificador.mesEscala && 
            props.verificador.mesTermino === props.verificador.mesEscala &&
            props.verificador.ano === props.verificador.anoEscala) {
                if (props.objeto.qtdConsultas === null) props.objeto.qtdConsultas = props.qtd.consultas;
                if (props.objeto.qtdEmergencias === null) props.objeto.qtdEmergencias = props.qtd.encaixes;
                xfetch(props.url, props.objeto, HttpVerbo.PUT)
                    .then( json =>{
                            if (typeof json !== "undefined" ? json.status === "OK" : false) {
                                ExibirMensagem('Consultorio Bloco Alterado Com Sucesso!', MSG.SUCESSO, '', '', '', window.location.reload());
                            }
                        }
                    )
                    .catch(error => console.log(error))
            } else {
                ExibirMensagem("Escala selecionada não pode ser diferente do mês de início e término da escala!", MSG.ALERTA);
            }
    }

    return (
        <>
            <Botao cor={props.corDoBotao} icone={props.icone} onClick={handleShow}>{props.nome}</Botao>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <p>
                            Deseja realmente salvar?
                        </p>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Botao cor={BOTAO.COR.SECUNDARIO} onClick={handleClose}>
                        Fechar
                    </Botao>
                    <Botao cor={BOTAO.COR.PRIMARIO} onClick={handleCadastrar}>
                        Salvar
                    </Botao>
                </Modal.Footer>
            </Modal>
        </>
    )
}

ModalFormAlterarConsultorioBloco.propTypes = {
    verificador: PropTypes.object,
    objeto: PropTypes.object,
    qtd: PropTypes.object,
    corDoBotao: PropTypes.string,
    icone: PropTypes.string,
    titulo: PropTypes.string,
    nome: PropTypes.string,
    texto: PropTypes.string,
    funcao: PropTypes.func,
    url: PropTypes.string,
}