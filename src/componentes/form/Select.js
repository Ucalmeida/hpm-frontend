import React, {useEffect, useState} from 'react';
import {xfetch} from "../../util/Util";
import {HttpVerbo} from "../../util/Constantes";
import "admin-lte/plugins/select2/css/select2.min.css";
import "admin-lte/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css";
import "admin-lte/plugins/select2/js/select2.full.min";
import $ from 'jquery/src/jquery'

export function Select({ url, valorAttr, nome, funcao, label }) {
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
    // $('.select2').select2()
    return (
        <div className="col-lg-12">
            <div className={"form-group"}>
                <label>{label}</label>
                <select className="form-control select2" value={valorAttr} name={nome} onChange={funcao}>
                    <option></option>
                    { lists.map((item) => <option key={item.valor} value={item.valor}>{item.texto}</option>) }
                </select>
            </div>
        </div>
    );
}