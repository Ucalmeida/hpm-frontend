import React, {useEffect, useState} from "react";
import {HttpVerbo, Tipo} from "./Constantes";
import {ExibirMensagem} from "./ExibirMensagem";

const xfetch = (endpoint, dados, verbo = HttpVerbo.GET) => {
    const servidor = process.env.NODE_ENV === 'development'? 'http://localhost:8080' : 'http://172.23.7.47:8081'

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
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
             .catch(e => ExibirMensagem(e.message,Tipo.MSG.ERRO));
    } else {
        return fetch(servidor+endpoint, myInit)
            .catch(e => ExibirMensagem(e.message,Tipo.MSG.ERRO));
    }
}
const IsLogado = () => {
    let token = localStorage.getItem('token')
    return !token;
}

const RemoverCaracteresEspeciais = (texto) => {
    texto = texto.replace((/[ÀÁÂÃÄÅ]/g,"A"))
    return texto;
}

export {
    xfetch,
    IsLogado,
    RemoverCaracteresEspeciais,
};


