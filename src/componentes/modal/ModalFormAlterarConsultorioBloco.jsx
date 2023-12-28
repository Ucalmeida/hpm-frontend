import PropTypes from "prop-types";
import React, { useState } from "react";
import { ExibirMensagem, xfetch } from '../../util';
import { HttpVerbo, MSG } from "../../util/Constantes";
import { BotaoAlterar } from "../Botao";
import { ModalFormCancelamento } from "./ModalFormCancelamento";

export default function ModalFormAlterarConsultorioBloco(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCadastrar = () => {
        enviar();
        setShow(false);
    }

    const enviar = () => {
        if (props.verificador.mesInicio === props.verificador.mesEscala && 
            props.verificador.mesTermino === props.verificador.mesEscala &&
            props.verificador.ano === props.verificador.anoEscala) {
                if (props.objeto.qtdConsultas === null) props.objeto.qtdConsultas = props.qtd.consultas;
                if (props.objeto.qtdEmergencias === null) props.objeto.qtdEmergencias = props.qtd.encaixes;
                xfetch(props.url, props.objeto, HttpVerbo.PUT)
                    .then( json => {
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
            <BotaoAlterar cor={props.corDoBotao} icone={props.icone} onClick={handleShow}>{props.nome}</BotaoAlterar>
            <ModalFormCancelamento
            show={show}
            onHide={handleClose}
            titulo={props.titulo}
            body="Deseja realmente alterar?"
            handleClose={handleClose}
            handleOpen={handleCadastrar}
             />
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