import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from "prop-types";
import {Icone} from "./Icone";
import {BOTAO, ICONE} from "../util/Constantes";

function Botao (props) {
    let cor, spinner, tamanho;

        tamanho = !props.tamanho ? BOTAO.TAMANHO.MEDIO : props.tamanho;

        if (props.carregando) {
            spinner = (
                <Spinner
                    className="ml-2"
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            );
        } else spinner = '';
        !props.cor ? cor = 'primary' : cor = props.cor;
        return(
            <Button
                variant={cor}
                className={props.className+tamanho+" m-1"}
                disabled={props.carregando || props.disabled}
                onClick={props.onClick}
                props
            >
                {props.icone ? <Icone icone={props.icone} /> : ''}
                {props.children}
                {spinner}
            </Button>
        )
}
Botao.propTypes = {
    cor: PropTypes.string,
    tamanho: PropTypes.string,
    icone: PropTypes.string,
    carregando: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func
}

const protoTipo = {
    onClick: PropTypes.func,
    tamanho: PropTypes.string,
}
const BotaoAlterar = ({onClick, tamanho, ...otherProps}) => {
    return(<Botao icone={ICONE.ALTERAR} cor={BOTAO.COR.ALERTA} tamanho={tamanho} onClick={onClick} {...otherProps}>Alterar</Botao>);
}
BotaoAlterar.propTypes = protoTipo;

const BotaoEnviar = ({onClick, tamanho, ...otherProps}) => {
    return(<Botao icone={ICONE.ENVIAR} cor={BOTAO.COR.PRIMARIO} tamanho={tamanho} onClick={onClick} {...otherProps}>Enviar</Botao>);
}
BotaoEnviar.propTypes = protoTipo

const BotaoImprimir = ({onClick, tamanho, ...otherProps}) => {
    return(<Botao icone={ICONE.IMPRIMIR} cor={BOTAO.COR.PRIMARIO} tamanho={tamanho} onClick={onClick} {...otherProps}>Imprimir</Botao>);
}
BotaoImprimir.propTypes = protoTipo

const BotaoSalvar = ({onClick, tamanho, ...otherProps}) => {
    return(<Botao icone={ICONE.SALVAR} cor={BOTAO.COR.SUCESSO} tamanho={tamanho} onClick={onClick} {...otherProps}>Salvar</Botao>);
}
BotaoSalvar.propTypes = protoTipo

const BotaoExcluir = ({onClick, tamanho, ...otherProps}) => {
    return(<Botao icone={ICONE.EXCLUIR} cor={BOTAO.COR.PERIGO} tamanho={tamanho} onClick={onClick} {...otherProps}>Excluir</Botao>);
}
BotaoExcluir.propTypes = protoTipo

const BotaoPesquisar = ({onClick, tamanho, ...otherProps}) => {
    return(<Botao icone={ICONE.PESQUISAR} cor={BOTAO.COR.PRIMARIO} tamanho={tamanho} onClick={onClick} {...otherProps}>Pesquisar</Botao>);
}
BotaoPesquisar.propTypes = protoTipo

export {
    Botao,
    BotaoAlterar,
    BotaoEnviar,
    BotaoExcluir,
    BotaoImprimir,
    BotaoPesquisar,
    BotaoSalvar,
};

