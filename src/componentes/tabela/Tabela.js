import React from 'react';
import PropTypes from 'prop-types';
import DataReact from "@ashvin27/react-datatable"
import {RemoverCaracteresEspeciaisMinusculo} from "../../util";

function Tabela (props) {

    const gerarColunas = () => {
        return props.colunas.map((coluna, index) => {
            coluna.text = coluna.texto;
            if (!coluna.key) coluna.key = RemoverCaracteresEspeciaisMinusculo(coluna.texto);
            if (!coluna.sortable) coluna.sortable = true
                return coluna
            })
    }

    const config = {
        page_size: 10,
        length_menu: [5 ,10, 20, 50,100 ],
        button: {
            excel: true,
            print: true,
            csv: true
        },
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

    return ( <DataReact columns={gerarColunas()} records={props.dados} config={config}/> );
};

Tabela.propTypes = {
    colunas: PropTypes.array.isRequired,
    dados: PropTypes.array.isRequired,
    rodape: PropTypes.string,
    botoes: PropTypes.any,
    pesquisar: PropTypes.bool,

};

export {Tabela};