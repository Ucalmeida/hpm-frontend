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
        return (c === 'x' ? r : (r && 0x3 || 0x8)).toString(16);
    });
}

const erro = (e) => {
    switch (e.status) {
        case 500: {
            Promise.resolve(e.json()).then(dados => ExibirMensagem(dados.message, MSG.ERRO))
            return
        }

        case 400: {
            Promise.resolve(e.json()).then(dados => ExibirMensagem(dados.message, MSG.ALERTA))
            return
        }

        case 404: {
            ExibirMensagem("Página não encontrada", MSG.ALERTA)
            return
        }

        case 403: {
            ExibirMensagem("Você não possui acesso a esse recurso", MSG.ERRO)
            return
        }
        default: return e.json()
    }
}

function ExcecaoNegocio(message) {
    this.message = message;
    this.name = "ExcecaoNegocio";
}

export const xfetch = (endpoint, dados, verbo = HttpVerbo.GET) => {

    console.log(process.env.NODE_ENV)

    let servidor = process.env.REACT_APP_BACKEND

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
        cache: 'default'};

    if (verbo === HttpVerbo.POST || verbo === HttpVerbo.PUT) {
         return fetch(servidor+endpoint, {
            headers: myHeaders,
            method: verbo,
            body: JSON.stringify(dados)
        })
             .then(erro)
             .catch((e) => erro(e, idTransacao));
    } else {
        return fetch(servidor+endpoint, myInit)
            .catch(e => erro(e, idTransacao));
    }
}

export function Logado () {
    return localStorage.getItem('token');
}

export function ValidaToken () {
    const tokenJson = {
        token: localStorage.getItem('token')
    }
    xfetch('/validaToken',tokenJson, HttpVerbo.POST)
        .then(json => {
            if (!json.resultado) {
                localStorage.clear();
                window.location.replace('/login')
            }
        })
}

