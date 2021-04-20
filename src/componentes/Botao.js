import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Icone from "./Icone";
import proptype from 'prop-types'
import {Tipo} from "../util/Constantes";

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
const BotaoEnviar = ({...otherProps}) => {
    return(<Botao icone={Tipo.ICONE.ENVIAR} cor={Tipo.COR_BOTAO.PRIMARIO} {...otherProps}>Enviar</Botao>);
}
const BotaoSalvar = ({...otherProps}) => {
    return(<Botao icone={Tipo.ICONE.SALVAR} cor={Tipo.COR_BOTAO.SUCESSO} {...otherProps}>Salvar</Botao>);
}
const BotaoExcluir = ({...otherProps}) => {
    return(<Botao icone={Tipo.ICONE.EXCLUIR} cor={Tipo.COR_BOTAO.PERIGO} {...otherProps}>Salvar</Botao>);
}
const BotaoPesquisar = ({...otherProps}) => {
    return(<Botao icone={Tipo.ICONE.PESQUISAR} cor={Tipo.COR_BOTAO.PRIMARIO} {...otherProps}>Salvar</Botao>);
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

