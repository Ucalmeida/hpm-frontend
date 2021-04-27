import React, {useEffect, useState} from 'react';
import {xfetch} from "../../util/Util";
import {HttpVerbo} from "../../util/Constantes";

function Select({ url, valorAttr, nome, funcao }) {
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

    return (
        <div className="row">
            <select onChange={funcao}>
                <option></option>
                { lists.map((item) => <option key={item.valor} value={valorAttr} name={nome}>{item.texto}</option>) }
            </select>
        </div>
    );
}

export default Select;