import React, {useEffect, useState} from "react";
import bootbox from "bootbox/dist/bootbox.all.min";
import Icone from "../componentes/Icone";
import {msgErro} from "./Msg";
import {HttpVerbo, Tipo} from "./Constantes";

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


const IsLogado = () => {
    let token = localStorage.getItem('token')
    return !token;
}

const RemoverCaracteresEspeciais = (texto) => {
    texto = texto.replace((/[ÀÁÂÃÄÅ]/g,"A"))
    return texto;
}


const ExibirMensagemIcone = (icone) => {
    useEffect(() => {
        // iconess = <Icone icone={icone}/>
        console.log('icones')
    });
    return <Icone icone={icone}/>
}

function ExibirMensagem (mensagem, tipo, titulo, icone)  {
    let teste = <Icone icone={icone}/>
    console.log(JSON.stringify(teste))
    switch (tipo) {
        case Tipo.MSG.ERRO:
        if (!titulo) titulo = 'Erro '
        // if (!icone) icone = "<i class='fas fa-plus'></i>"
        if (!icone) {
            icone = <Icone icone={Tipo.ICONE.ERRO} />
            // render:  {
            //     return React.createElement("div", null, "Hello ", this.props.name);
            // }
            console.log(icone)
            // icone = "<i class='fas fa-times-circle'> </i>"
            console.log(icone)
        }
        mensagem = msgErro()+mensagem
        break;

        case Tipo.MSG.INFO:
            return bootbox.alert(mensagem);

        default: return bootbox.alert(tipo);
    }


        return bootbox.dialog({
            title: icone+titulo,
            message: mensagem
        })
}

const CorTexto = (cor) => {
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
    IsLogado,
    RemoverCaracteresEspeciais,
    ExibirMensagem,
    CorTexto,
};


