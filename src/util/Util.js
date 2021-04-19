import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import bootbox from "bootbox/dist/bootbox.all.min";
import Icone from "../componentes/Icone";
import {msgErro, msgSucesso} from "./Msg";
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

function ExibirMensagem (mensagem, tipo, objeto, titulo, icone, tamanho)  {
    //TODO implementar o tamanho e objeto

    let corBotao = Tipo.COR_BOTAO.PRIMARIO;
    if (icone) icone = <Icone icone={icone} cor={Tipo.COR_TEXTO.PRIMARIO}/>

    switch (tipo) {
        case Tipo.MSG.ERRO:
            corBotao = Tipo.COR_BOTAO.PERIGO;
            icone = <Icone icone={!icone ? Tipo.ICONE.ERRO : icone} />
            mensagem = mensagem
            titulo = "<span id='icone' class="+Tipo.COR_TEXTO.PERIGO+"></span>" + (!titulo ? Tipo.MSG.ERRO : titulo);
            break;

        case Tipo.MSG.SUCESSO:
            let msgObjeto = '';
            if (objeto) {
                msgObjeto += '<br><br><ul className={"mt-5"}>'
                for (const key in objeto) {
                    msgObjeto += (`<li id="${key}">${key}: ${objeto[key]}</li>`);
                }
                msgObjeto += '</ul>'
            };
            corBotao = Tipo.COR_BOTAO.SUCESSO;
            icone = <Icone icone={!icone ? Tipo.ICONE.OK : icone} />
            titulo = "<span id='icone' class="+Tipo.COR_TEXTO.SUCESSO+"></span>" + (!titulo ? Tipo.MSG.SUCESSO : titulo);
            mensagem = mensagem + msgObjeto;
            break;

        case Tipo.MSG.INFO:
        default:
            icone = <Icone icone={!icone ? Tipo.ICONE.OK : icone} />
    }
        bootbox.dialog({
            title: titulo,
            message: mensagem,
            buttons: {
                ok: {
                    label: "<span id='icone2'></span>OK",
                    className: corBotao
                }
            }

        })
        if (icone && titulo) ReactDOM.render(icone,document.getElementById('icone'))
        if (icone) ReactDOM.render(icone,document.getElementById('icone2'))
    return;
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


