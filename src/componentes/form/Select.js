import React, {useEffect, useState} from 'react';
import {xfetch} from "../../util/Util";
import {HttpVerbo} from "../../util/Constantes";
import ReactSelect, { components } from "react-select"

export function Select({ url, valorAttr, nome, funcao, label, nomeClasse }) {
    const [lists, setLists] = useState([]);

    const loadBloods = async () => {
        const bloodResponse = xfetch(url, {}, HttpVerbo.GET)
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

    return (
        <div className="col-lg-12">
            <div className={"form-group"}>
                <label>{label}</label>
                <ReactSelect options={options} value={valorAttr} name={nome} onChange={funcao} components={{ NoOptionsMessage,Placeholder }}/>
            </div>
        </div>
    );
}