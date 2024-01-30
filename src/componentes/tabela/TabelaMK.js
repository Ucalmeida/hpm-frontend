import DataReact from "@mkikets/react-datatable";
import PropTypes from 'prop-types';
import React from 'react';
import { ConverterCaracteresEspeciaisMinusculo } from "../../util";

function Tabela (props) {

    const gerarColunas = () => {
        return props.colunas.map((coluna, index) => {
            if (!coluna.key) coluna.key = ConverterCaracteresEspeciaisMinusculo(coluna.text);
            if (!coluna.sortable) coluna.sortable = true
                return coluna
            })
    }

    const gerarDados = () => {
        return props.dados
    }

    const getBotoes = () => {
        return ({
                excel: props.botoes,
                print: props.botoes,
                csv: props.botoes
        })
    }
    const getBotoesExtra = () => {
        //TODO
    }

    const pegarId = () => {
        return props.id;
    }

    const config = {
        page_size: props.pageSize,
        length_menu: [5 ,10, 20, 50,100 ],
        button: getBotoes(),
        fa5_support: true,
        language: {
            length_menu: "Mostrar _MENU_ registros por página",
            filter: "Pesquisar...",
            info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
            pagination: {
                first: "Primeira",
                previous: "Anterior",
                next: "Próxima",
                last: "Última"
            },
            no_data_text: "Nenhum dado encontrado",
            loading_text: "Carregando..."
        }
    }

    return ( <DataReact id={pegarId()} columns={gerarColunas()} records={gerarDados()} config={config}/> );
};

Tabela.propTypes = {
    id: PropTypes.string,
    colunas: PropTypes.array.isRequired,
    dados: PropTypes.any.isRequired,
    rodape: PropTypes.string,
    botoes: PropTypes.bool,
    botoesExtra: PropTypes.any,
    pesquisar: PropTypes.bool,
    pageSize: PropTypes.number.isRequired
};
Tabela.defaultProps = {
    botoes: true
}

export { Tabela };
