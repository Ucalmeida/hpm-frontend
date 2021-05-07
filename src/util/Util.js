import React from "react";
import {HttpVerbo, MSG} from "./Constantes";
import {ExibirMensagem} from "./ExibirMensagem";

const uuid = () => {
    var d = new Date().getTime();
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

const xfetch = (endpoint, dados, verbo = HttpVerbo.GET) => {
    const servidor = process.env.NODE_ENV === 'development'? 'http://localhost:8080' : 'http://172.23.7.47:8081'

    let myHeaders = new Headers();
    let idTransacao = uuid();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("idTransacao", idTransacao);
    if (localStorage.getItem('token')) {
        myHeaders.append("token", localStorage.getItem('token'));
    }

    const myInit = { method: verbo,
        headers: myHeaders,
        mode: 'cors',
        cache: 'default' };

    if (verbo === HttpVerbo.POST) {
         return fetch(servidor+endpoint, {
            headers: myHeaders,
            method: verbo,
            body: JSON.stringify(dados)
        })
             .then(res => res.json())
             .catch(e => ExibirMensagem(e.message + '<br/> idTransacao = <b>'+ idTransacao + '</b>', MSG.ERRO));
    } else {
        return fetch(servidor+endpoint, myInit)
            .catch(e => ExibirMensagem(e.message + '<br/> idTransacao = <b>'+ idTransacao + '</b>', MSG.ERRO));
    }
}
const Logado = () => {
    xfetch('/validaToken',localStorage.getItem('token'), HttpVerbo.POST)
        .then(json => {
            console.log(json)
            return json.resultado ? true : false;
        })
}

const RemoverCaracteresEspeciais = (texto) => {
    texto = texto.replace((/[ÀÁÂÃÄÅ]/g,"A"))
    return texto;
}

export {
    xfetch,
    Logado,
    RemoverCaracteresEspeciais,
};

