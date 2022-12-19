import {ExibirMensagem, xfetch} from "../util";
import {HttpVerbo, MSG} from "../util/Constantes";

export const UseHandleExcluir = (url, dados, mensagem, funcao) => {
    xfetch(url, dados, HttpVerbo.PUT)
        .then( json => {
                if (typeof json !== "undefined" ? json.status === "OK" : false) {
                    ExibirMensagem(mensagem, MSG.SUCESSO, '', '', '', '', funcao);
                }
            }
        )
}