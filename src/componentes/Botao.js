import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from "prop-types";
import {Icone} from "./Icone";
import {BOTAO, ICONE} from "../util/Constantes";
import {getClasse} from "./index";

export function Botao (props) {

        const cor = !props.cor ? "primary" : props.cor;
        const tamanho = !props.tamanho ? BOTAO.TAMANHO.MEDIO : props.tamanho;

        const spinner = (props.carregando) ? (
                <Spinner
                    className="ml-2"
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            ) : "";
        return(
            <Button
                variant={cor}
                className={getClasse(props.className)+tamanho+" mb-1 mr-1"}
                disabled={props.carregando || props.disabled}
                onClick={props.onClick}
                {...props}
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
    tamanho: PropTypes.string
}

export function BotaoAlterar (props) {
    return(<Botao icone={ICONE.ALTERAR} cor={BOTAO.COR.ALERTA} tamanho={props.tamanho} onClick={props.onClick} {...props}>Alterar</Botao>);
}
BotaoAlterar.propTypes = protoTipo;

export function BotaoEnviar (props) {
    return(<Botao icone={ICONE.ENVIAR} cor={BOTAO.COR.PRIMARIO} tamanho={props.tamanho} onClick={props.onClick} {...props}>Enviar</Botao>);
}
BotaoEnviar.propTypes = protoTipo

export function BotaoImprimir (props) {
    return(<Botao icone={ICONE.IMPRIMIR} cor={BOTAO.COR.SECUNDARIO} tamanho={props.tamanho} onClick={props.onClick} {...props}>Imprimir</Botao>);
}
BotaoImprimir.propTypes = protoTipo

export function BotaoSalvar (props) {
    return(<Botao icone={ICONE.SALVAR} cor={BOTAO.COR.SUCESSO} tamanho={props.tamanho} onClick={props.onClick} {...props}>Salvar</Botao>);
}
BotaoSalvar.propTypes = protoTipo

export function BotaoExcluir (props) {
    return(<Botao icone={ICONE.EXCLUIR} cor={BOTAO.COR.PERIGO} tamanho={props.tamanho} onClick={props.onClick} {...props}>Excluir</Botao>);
}
BotaoExcluir.propTypes = protoTipo

export function BotaoPesquisar (props) {
    return(<Botao icone={ICONE.PESQUISAR} cor={BOTAO.COR.PRIMARIO} tamanho={props.tamanho} onClick={props.onClick} {...props}>Pesquisar</Botao>);
}
BotaoPesquisar.propTypes = protoTipo
