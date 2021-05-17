import {Accordion} from './card/Accordion'
import {Autocompletar, Input, Select} from './form'
import {Botao, BotaoAlterar, BotaoEnviar, BotaoExcluir, BotaoImprimir, BotaoPesquisar, BotaoSalvar} from './Botao'
import {Card} from "./card/Card";
import {Icone} from "./Icone";
import {Pagina} from "./pagina/Pagina";
import {Spinner} from "./Spinner";
import {CadastrarNome} from "./CadastrarNome";

export function getClasse(classe) {
    return !classe ? "" : classe.toString()+" ";
}

export {
    Accordion,
    Autocompletar,
    Botao,
    BotaoEnviar,
    BotaoAlterar,
    BotaoExcluir,
    BotaoImprimir,
    BotaoPesquisar,
    BotaoSalvar,
    Card,
    Icone,
    Input,
    Pagina,
    Select,
    Spinner,
    CadastrarNome
}