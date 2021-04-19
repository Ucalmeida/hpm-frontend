import React, {useEffect, useState} from 'react';
import {xfetch} from "../../util/Util";
import {HttpVerbo} from "../../util/Constantes";

function Select({ url }) {
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
            <select>
                <option></option>
                { lists.map((item) => <option key={item.valor}>{item.texto}</option>) }
            </select>
        </div>
    );
}

export default Select;