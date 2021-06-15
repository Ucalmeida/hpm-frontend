import React from 'react';
import PropTypes from 'prop-types';
import TColunas from "./TColunas";
import TCorpo from "./TCorpo";
import TRodape from "./TRodape";

export function Tabela (props) {
    const configuracoes = {
        button: props.botoes == undefined ? {

        } : {
            excel: true,
            csv: true,
            print: true,
        },
    }
    const botoes = {

    }

    return (
        <div>
            <table>
            <TColunas colunas={props.colunas}/>
            <TCorpo />
            <TRodape />
            </table>

        </div>
    );
};

Tabela.propTypes = {
    colunas: PropTypes.object,
    rodape: PropTypes.string,
    dados: PropTypes.string,
    botoes: PropTypes.any,
    pesquisar: PropTypes.bool,

};

export default Tabela;