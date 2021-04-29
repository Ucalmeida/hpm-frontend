import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Tipo} from "../../util";
import {Botao} from "./Botao";

export class BotaoAlterar extends Component {
    render() {
        return (
            <Botao icone={Tipo.ICONE.ALTERAR} cor={Tipo.COR_BOTAO.ALERTA} tamanho={this.props.tamanho} onClick={this.props.onClick} {...otherProps}>Alterar</Botao>
        );
    }
}

BotaoAlterar.propTypes = {
    tamanho: PropTypes.string,
    onClick: PropTypes.func,

};
