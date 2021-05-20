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

const erro = (e, idTransacao) => {
    console.log(e.message)
    if (e.message === 'Could not connect to the server.') {
        ExibirMensagem('O servidor está desconectado' + '<br/> idTransacao = <b>'+ idTransacao + '</b>', MSG.ERRO);
        return;
    }
    ExibirMensagem(e.message + '<br/> idTransacao = <b>'+ idTransacao + '</b>', MSG.ERRO);
}

function ExcecaoNegocio(message) {
    this.message = message;
    this.name = "ExcecaoNegocio";
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
             .then((res, obj) => {
                 if (res.message === 'Could not connect to the server.') {
                     throw new ExcecaoNegocio("Servidor não encontrado.")
                 }
                 console.log(obj)
                 return res.json();
             })
             .catch(e => erro(e, idTransacao));
    } else {
        return fetch(servidor+endpoint, myInit)
            .catch(e => erro(e, idTransacao));
    }
}

const Logado = () => {
    if (localStorage.getItem('token')) {
        return true
    }
    return false
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

