import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import TColunas from "./TColunas";
import TCorpo from "./TCorpo";
import TRodape from "./TRodape";
import DataReact from "@ashvin27/react-datatable"

function Tabela (props) {
    const columns = [
        {
            key: "name",
            text: "Name",
            className: "name",
            align: "left",
            sortable: true,
        },
        {
            key: "address",
            text: "Address",
            className: "address",
            align: "left",
            sortable: true
        },
        {
            key: "postcode",
            text: "Postcode",
            className: "postcode",
            sortable: true
        },
        {
            key: "rating",
            text: "Rating",
            className: "rating",
            align: "left",
            sortable: true
        },
        {
            key: "type_of_food",
            text: "Type of Food",
            className: "type_of_food",
            sortable: true,
            align: "left"
        },
    ];
    const records = [
        {
            "id": "55f14312c7447c3da7051b26",
            "address": "228 City Road",
            "name": ".CN Chinese",
            "postcode": "3JH",
            "rating": 5,
            "type_of_food": "Chinese"
        },
        {
            "id": "55f14312c7447c3da7051b27",
            "address": "376 Rayleigh Road",
            "name": "@ Thai",
            "postcode": "5PT",
            "rating": 5.5,
            "type_of_food": "Thai"
        },
        {
            "id": "55f14312c7447c3da7051b28",
            "address": "30 Greyhound Road Hammersmith",
            "name": "@ Thai Restaurant",
            "postcode": "8NX",
            "rating": 4.5,
            "type_of_food": "Thai"
        },
        {
            "id": "55f14312c7447c3da7051b29",
            "address": "30 Greyhound Road Hammersmith",
            "name": "@ Thai Restaurant",
            "postcode": "8NX",
            "rating": 4.5,
            "type_of_food": "Thai"
        }
    ]

    const config = {
        page_size: 10,
        length_menu: [ 10, 20, 50,100 ],
        button: {
            excel: true,
            print: true,
            csv: true
        },
        language: {
            length_menu: "Mostrar _MENU_ registros por página",
            filter: "Pesquisar ...",
            info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
            pagination: {
                first: "Primeira",
                previous: "Anterior",
                next: "Próxima",
                last: "Última"
            }
        }
    }
    console.log(records)
    console.log(<DataReact columns={columns} records={records} config={config} />)

    return (
            <DataReact columns={columns} records={records} config={config} />
            // {/*<TColunas colunas={props.colunas}/>*/}
            // {/*<TCorpo />*/}
            // {/*<TRodape />*/}

    );
};

Tabela.propTypes = {
    colunas: PropTypes.object.isRequired,
    rodape: PropTypes.string,
    dados: PropTypes.string.isRequired,
    botoes: PropTypes.any,
    pesquisar: PropTypes.bool,

};

export default Tabela;