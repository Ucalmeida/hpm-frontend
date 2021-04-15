import React from 'react';
import {CorTexto} from "../util/Util";

const Icone = ({icone, cor, margem}) => {
    const icones = {
        erro: 'far fa-times-circle',
        excluir: 'far fa-trash-alt',
        imprimir: 'fas fa-print',
        ok: 'far fa-check-circle',
        pesquisar: 'fas fa-search',
        salvar: 'far fa-save',
        voltar: 'fas fa-reply'
    };

    cor = CorTexto(cor)
    if (!cor) cor = "";
    if (!margem) margem = " mr-2"; else margem = "";
    if (icone && icones[icone]) {
        return(<i className={icones[icone]+margem+cor}></i>);
    } else {
        return (<i className={icone+margem+cor}></i>);
    };
}
export default Icone;