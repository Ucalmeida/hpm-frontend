import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import ReactSelect, { components } from "react-select"
import {xfetch} from "../../util/Util";
import {HttpVerbo} from "../../util/Constantes";

export function Select(props) {
    const [lists, setLists] = useState([]);

    const loadBloods = async () => {
        const bloodResponse = xfetch(props.url, {}, HttpVerbo.GET)
            .then(r => r.json());
        bloodResponse.then(data => setLists(data.resultado));
    }

    useEffect(() => {
        loadBloods();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const options = lists.map((item) => {
        return {value: item.valor,label: item.texto, key: item.valor}
    })

    const NoOptionsMessage = props => {
        return (
            <span content="Custom NoOptionsMessage Component">
                <components.NoOptionsMessage {...props}>Nenhum resultado encontrado</components.NoOptionsMessage>
            </span>
        );
    };
    const Placeholder = props => {
        return <components.Placeholder {...props}>Selecione</components.Placeholder>;
    };

    return ( <ReactSelect options={options} value={props.valorAttr} name={props.nome} onChange={props.funcao} components={{ NoOptionsMessage,Placeholder }} {...props} /> );
}
Select.propTypes = {
    url: PropTypes.string.isRequired,
    valorAttr: PropTypes.string,
    nome: PropTypes.string,
    funcao: PropTypes.func,
}