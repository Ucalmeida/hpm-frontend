import ReactDOM from "react-dom";
import React from "react";
import bootbox from "bootbox";
import {Tipo} from "./Constantes";
import {Icone} from "../componentes/Icone";

const ExibirMensagem = (mensagem, tipo, objeto, titulo, icone, tamanho) => {
    //TODO implementar o tamanho e objeto

    let corBotao = Tipo.COR_BOTAO.PRIMARIO;

    switch (tipo) {

        case Tipo.MSG.ALERTA:
            corBotao = Tipo.COR_BOTAO.ALERTA;
            icone = <Icone icone={!icone ? Tipo.ICONE.ERRO : icone} />
            titulo = "<span id='icone' class="+Tipo.COR_TEXTO.ALERTA+"></span>" + (!titulo ? Tipo.MSG.ALERTA : titulo);
            break;

        case Tipo.MSG.ERRO:
            corBotao = Tipo.COR_BOTAO.PERIGO;
            icone = <Icone icone={!icone ? Tipo.ICONE.ERRO : icone} />
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
            if (icone) icone = <Icone icone={icone} cor={Tipo.COR_TEXTO.PRIMARIO}/>;
            else icone = <Icone icone={Tipo.ICONE.OK} />
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

export {ExibirMensagem};