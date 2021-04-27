import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import proptype from 'prop-types'
import {Tipo} from "../util/Constantes";
import {Icone} from "./Icone";

const Botao = ({cor, tamanho, icone, tipo, carregando, disabled, className, onClick, children, ...otherProps}) => {
        let iconeTemplate;
        let spinnerTemplate;
        let classe;

        const getTamanho = () => {
            switch (tamanho) {
                case 1:
                    return " btn-xs";
                case 2:
                    return " btn-sm";
                case 4:
                    return " btn-lg";
                case 5:
                    return " btn-xl";
                default: return "";
            }
        }

        if (carregando) {
            spinnerTemplate = (
                <Spinner
                    className="ml-2"
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            );
        }
        if (!cor) cor = 'primary';
        if (className) classe = className; else classe = "";
    return(
        <Button
            {...otherProps}
            variant={cor}
            className={classe+getTamanho()+" m-1"}
            disabled={carregando || disabled}
            onClick={onClick}
        >
            {icone ? <Icone icone={icone} /> : ''}
            {children}
            {spinnerTemplate}
        </Button>
    )
    };
const BotaoAlterar = ({tamanho, onClick, ...otherProps}) => {
    return(<Botao icone={Tipo.ICONE.ALTERAR} cor={Tipo.COR_BOTAO.ALERTA} tamanho={tamanho} onClick={onClick} {...otherProps}>Alterar</Botao>);
}
const BotaoEnviar = ({tamanho, onClick, ...otherProps}) => {
    return(<Botao icone={Tipo.ICONE.ENVIAR} cor={Tipo.COR_BOTAO.PRIMARIO} tamanho={tamanho} onClick={onClick} {...otherProps}>Enviar</Botao>);
}
const BotaoImprimir = ({tamanho, onClick, ...otherProps}) => {
    return(<Botao icone={Tipo.ICONE.IMPRIMIR} cor={Tipo.COR_BOTAO.PRIMARIO} tamanho={tamanho} onClick={onClick} {...otherProps}>Imprimir</Botao>);
}
const BotaoSalvar = ({tamanho, onClick, ...otherProps}) => {
    return(<Botao icone={Tipo.ICONE.SALVAR} cor={Tipo.COR_BOTAO.SUCESSO} tamanho={tamanho} onClick={onClick} {...otherProps}>Salvar</Botao>);
}
const BotaoExcluir = ({tamanho, onClick, ...otherProps}) => {
    return(<Botao icone={Tipo.ICONE.EXCLUIR} cor={Tipo.COR_BOTAO.PERIGO} tamanho={tamanho} onClick={onClick} {...otherProps}>Excluir</Botao>);
}
const BotaoPesquisar = ({tamanho, onClick, ...otherProps}) => {
    return(<Botao icone={Tipo.ICONE.PESQUISAR} cor={Tipo.COR_BOTAO.PRIMARIO} tamanho={tamanho} onClick={onClick} {...otherProps}>Salvar</Botao>);
}
Botao.prototype = {
    /** Isso sera a tampa*/
    cor: proptype.string,
    tamanho: proptype.number,
    icone: proptype.string,
    carregando: proptype.bool,
    disabled: proptype.bool,
    className: proptype.string
}
export {
    Botao,
    BotaoEnviar,
    BotaoExcluir,
    BotaoPesquisar,
    BotaoSalvar,
    };

