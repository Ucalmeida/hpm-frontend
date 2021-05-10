import ReactDOM from "react-dom";
import React from "react";
import bootbox from "bootbox";
import {Icone} from "../componentes/Icone";
import {BOTAO, ICONE, MSG, TEXTO} from "./Constantes";

export function ExibirMensagem (mensagem, tipo, objeto, titulo, icone, tamanho) {
    //TODO implementar o tamanho e objeto

    let corBotao = BOTAO.COR.PRIMARIO;

    switch (tipo) {

        case MSG.ALERTA:
            corBotao = BOTAO.COR.ALERTA;
            icone = <Icone icone={!icone ? ICONE.ERRO : icone} />
            titulo = "<span id='icone' class="+TEXTO.COR.ALERTA+"></span>" + (!titulo ? MSG.ALERTA : titulo);
            break;

        case MSG.ERRO:
            corBotao = BOTAO.COR.PERIGO;
            icone = <Icone icone={!icone ? ICONE.ERRO : icone} />
            titulo = "<span id='icone' class="+TEXTO.COR.PERIGO+"></span>" + (!titulo ? MSG.ERRO : titulo);
            break;

        case MSG.SUCESSO:
            let msgObjeto = '';
            if (objeto) {
                msgObjeto += '<br><br><ul className={"mt-5"}>'
                for (const key in objeto) {
                    msgObjeto += (`<li id="${key}">${key}: ${objeto[key]}</li>`);
                }
                msgObjeto += '</ul>'
            };
            corBotao = BOTAO.COR.SUCESSO;
            icone = <Icone icone={!icone ? ICONE.OK : icone} />
            titulo = "<span id='icone' class="+TEXTO.COR.SUCESSO+"></span>" + (!titulo ? MSG.SUCESSO : titulo);
            mensagem = mensagem + msgObjeto;
            break;

        case MSG.INFO:
        default:
            if (icone) icone = <Icone icone={icone} cor={TEXTO.COR.PRIMARIO}/>;
            else icone = <Icone icone={ICONE.OK} />
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
