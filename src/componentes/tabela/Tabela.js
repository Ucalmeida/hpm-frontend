import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import DataReact from "@mkikets/react-datatable";
import {RemoverCaracteresEspeciaisMinusculo, xfetch} from "../../util";
import {HttpVerbo} from "../../util/Constantes";

function Tabela (props) {

    const [lists, setLists] = useState([]);

    const carregarDados = async () => {
        if (!Array.isArray(props.dados)) {
            const dadosResponse = xfetch(props.dados, {}, HttpVerbo.GET)
                .then(r => r.json());
            dadosResponse.then(data => setLists(data.resultado));
        }
    }

    useEffect(() => {
        carregarDados();
    }, [])

    const gerarColunas = () => {
        return props.colunas.map((coluna, index) => {
            if (!coluna.key) coluna.key = RemoverCaracteresEspeciaisMinusculo(coluna.text);
            if (!coluna.sortable) coluna.sortable = true
                return coluna
            })
    }

    const gerarDados = () => {
        if (Array.isArray(props.dados)) return props.dados
        return lists

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

    const config = {
        page_size: 10,
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

    return ( <DataReact columns={gerarColunas()} records={gerarDados()} config={config}/> );
};

Tabela.propTypes = {
    colunas: PropTypes.array.isRequired,
    dados: PropTypes.any.isRequired,
    rodape: PropTypes.string,
    botoes: PropTypes.bool,
    botoesExtra: PropTypes.any,
    pesquisar: PropTypes.bool,
};
Tabela.defaultProps = {
    botoes: true
}

export {Tabela};