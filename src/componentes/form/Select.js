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
        <div className="col-lg-12">
            <select className="form-control" value={valorAttr} name={nome} onChange={funcao}>
                <option></option>
                { lists.map((item) => <option key={item.valor} value={item.valor}>{item.texto}</option>) }
            </select>
        </div>
    );
}

export {Select};