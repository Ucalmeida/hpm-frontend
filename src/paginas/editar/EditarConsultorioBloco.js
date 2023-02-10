import React, { useState } from "react";
import PropTypes from "prop-types";
import logoHPM from "../../img/brasoes/brasao_hpm.png";

import { Botao, Input } from '../../componentes';
import { Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BOTAO, HttpVerbo } from '../../util/Constantes';
import { xfetch } from '../../util';

export default function EditarConsultorioBloco(props) {
    const [show, setShow] = useState(false);

    const [exibe, setExibe] = useState(false);

    const [dadosConsultorioBloco, setDadosConsultorioBloco] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (show) {
        let id = props.valor;
        xfetch("/hpm/consultorioBloco/" + id, {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                console.log("JSON Resultado:", json);
                setDadosConsultorioBloco({...dadosConsultorioBloco, bloco: json.resultado})
            })
        console.log("Valor de ID:", id);
    }

    console.log("Bloco:", dadosConsultorioBloco);

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
                            <img src={logoHPM} alt={"Brasão"}/>
                        </Link>
                    </div>
                    <Form>
                        <div className={"row col-lg-12"}>
                                <Input
                                    type="number"
                                    value={""}
                                    onChange={""}
                                    name="diasAfastado"
                                    label="Dias afastamento"
                                />
                                <input
                                    id="cidCheck"
                                    type="checkbox"
                                    style={{height: "10px", marginTop: "2.7em", marginLeft:"0.5em"}}
                                    onClick={""}
                                    name="exibirCid"
                                    checked={exibe}/>
                                <label className="form-check-label" htmlFor="cidCheck" style={{height: "20px", marginTop: "2.2em", marginLeft:"0.1em"}}><b>Deve mostrar o CID?</b></label>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Botao cor={BOTAO.COR.SECUNDARIO} onClick={handleClose}>
                        Fechar
                    </Botao>
                    <Botao cor={BOTAO.COR.PRIMARIO} onClick={""}>
                        Imprimir
                    </Botao>
                </Modal.Footer>
            </Modal>
        </>
    )
}

EditarConsultorioBloco.propTypes = {
  corDoBotao: PropTypes.string,
  icone: PropTypes.string,
  titulo: PropTypes.string,
  nome: PropTypes.string,
  valor: PropTypes.number,
  texto: PropTypes.string,
  funcao: PropTypes.func,
}