import React from "react";
import bootbox from "bootbox/dist/bootbox.all.min";
import Icone from "../componentes/Icone";
import {msgErro} from "./Msg";

const HttpVerbo = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
}

const xfetch = (endpoint, dados, verbo = HttpVerbo.GET) => {
    const servidor = process.env.NODE_ENV === 'development'? 'http://localhost:8080' : 'http://172.23.7.47:8081'

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    // myHeaders.append("Content-Length", content.length.toString());
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
             .catch(e => window.alert("Um erro ocorreu - " + e.message));
    } else {
        return fetch(servidor+endpoint, myInit)
            .catch(e => window.alert("Um erro ocorreu - " + e.message));
    }

}


const isLogado = () => {
    let token = localStorage.getItem('token')
    return !token;
}

const removerCaracteresEspecciais = (texto) => {
    texto = texto.replace((/[ÀÁÂÃÄÅ]/g,"A"))
    return texto;
}


const exibirMensagemIcone = (icone) => {
    return <Icone icone={icone}/>
}
const exibirMensagem = (tipo, mensagem, titulo, icone) => {
    if (tipo === 'info') {
    return bootbox.alert(mensagem)
    }
    switch (tipo) {
        case 'erro':
        if (!titulo) titulo = 'Erro '
        // if (!icone) icone = "<i class='fas fa-plus'></i>"
        if (!icone) {

            // render:  {
            //     return React.createElement("div", null, "Hello ", this.props.name);
            // }
            icone =
            console.log(icone)
            icone = "<i class='fas fa-times-circle'> </i>"
            console.log(icone)
        }
        mensagem = msgErro()+mensagem
    }

        return bootbox.dialog({
            title: icone+titulo,
            message: mensagem
        })
}

const corTexto = (cor) => {
    const cores = {
        primary: ' text-primary',
        secondary: ' text-secondary',
        info: ' text-info',
        danger: ' text-danger',
        warning: ' text-warning'
    }
    return (
        cores[cor]
    );
}

export {
    xfetch,
    HttpVerbo,
    isLogado,
    removerCaracteresEspecciais,
    exibirMensagem,
    corTexto,
};


