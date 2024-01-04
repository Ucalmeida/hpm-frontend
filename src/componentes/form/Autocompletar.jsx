import React, { useState, useEffect } from "react";
import * as $ from "jquery";
import 'jquery-ui/themes/base/all.css';
import 'jquery-ui/ui/widgets/autocomplete';
import { xfetch } from "../../util";
import { HttpVerbo } from "../../util/Constantes";

export const Autocompletar = (props) => {
    const [carregando, setCarregando] = useState(false);
    const [valor, setValor] = useState({});
    const [busca, setBusca] = useState('');

    const handle = (e) => {
        e.preventDefault();
        setBusca(e.target.value.toUpperCase());
        if (!e.target.value) {
            props.retorno(null);
        }
    };

    useEffect(() => {
        let idAuto = 'id' + props.name + 'Auto';
        const url = props.url;

        $('#' + idAuto).autocomplete({
            source: function (request, response) {
                setCarregando(true);
                let key = request.term;
                let requisicao = !isNaN(key) ? 'porCpf/' : 'porNome/';
                xfetch(url + requisicao + key, {}, HttpVerbo.GET)
                    .then(res => res.json())
                    .then(json => {
                        response(json.resultado);
                        setCarregando(false);
                    })
                    .catch(e => setCarregando(false));
            },
            minLength: props.tamanho,
            select: function (event, ui) {
                setValor(ui.item.value);
                setBusca(ui.item.label);
                props.retorno(ui.item.value);
                return false;
            }
        });
    }, [props.name, props.url, props.tamanho, props.retorno, props]);

    let spinner = '';
    if (carregando) {
        spinner = <span className="spinner-border spinner-border-sm text-success" role="status" />;
    }

    return (
        <>
            <div>
                <label>{props.label}</label>
                <input
                    id={'id' + props.name + 'Auto'}
                    autoComplete="off"
                    className="form-control"
                    type="text"
                    name="busca"
                    onChange={handle}
                    value={busca}
                    placeholder={props.placeholder}
                />
            </div>
            <div className="col-lg-1">
                <input
                    type="hidden"
                    id={'id' + props.name}
                    name={props.name}
                    value={valor}
                />
            </div>
            {spinner}
        </>
    );
};


