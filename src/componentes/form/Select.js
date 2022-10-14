import {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import ReactSelect, { components } from "react-select"
import {xfetch} from "../../util";
import {HttpVerbo} from "../../util/Constantes";

function Select(props) {
    const [lists, setLists] = useState([]);

    const loadBloods = async () => {
        const bloodResponse = await xfetch(props.url, {}, HttpVerbo.GET)
        .then(r => r.json())
        .then(data => setLists(data.resultado ))
        return bloodResponse;
    }

    useEffect(() => {
        loadBloods();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let options = lists.map((item) => {
        return {value: item.valor, label: item.texto, key: item.valor}
    })

    options.unshift({value: '', label: 'Selecione...', key: ''})

    const NoOptionsMessage = props => {
        return (
            <span content="Custom NoOptionsMessage Component">
                <components.NoOptionsMessage {...props}>Nenhum resultado encontrado</components.NoOptionsMessage>
            </span>
        );
    };

    const Placeholder = props => {
        const place = props.children === "Select..." ? 'Selecione...' : props.children;
        return <components.Placeholder {...props}>{place}</components.Placeholder>;
    };

    return ( <ReactSelect

            options={options}
            value={props.valorAttr}
            name={props.nome}
            isMulti={props.multiplo}
            onChange={props.funcao}
            components={{ NoOptionsMessage,Placeholder }}
            {...props} /> );
}

Select.propTypes = {
    url: PropTypes.string.isRequired,
    valorAttr: PropTypes.string,
    nome: PropTypes.string,
    funcao: PropTypes.func,
    placeholder: PropTypes.string
}

export {Select};