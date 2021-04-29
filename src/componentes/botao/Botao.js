import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from "prop-types";
import {Tipo} from "../../util";
import {Icone} from "../Icone";

export class Botao extends Component {
    cor;
    classe;
    spinner;

    render() {

        const getTamanho = () => {
            switch (this.props.tamanho) {
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

        if (this.props.carregando) {
            this.spinner = (
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
        !this.props.cor ? this.cor = 'primary' : this.cor = this.props.cor;
        return(
            <Button
                variant={this.props.cor}
                className={this.props.className+getTamanho()+" m-1"}
                disabled={this.props.carregando || this.props.disabled}
                onClick={this.props.onClick}
            >
                {this.props.icone ? <Icone icone={this.props.icone} /> : ''}
                {this.props.children}
                {this.spinner}
            </Button>
        )
    }

}
Botao.propTypes =
    {
        cor: PropTypes.string,
        tamanho: PropTypes.number,
        icone: PropTypes.string,
        carregando: PropTypes.bool,
        disabled: PropTypes.bool,
        className: PropTypes.string,
        onClick: PropTypes.func
    }

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
export {
    BotaoAlterar,
    BotaoEnviar,
    BotaoExcluir,
    BotaoPesquisar,
    BotaoSalvar,
    };

