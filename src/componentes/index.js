import {Accordion} from './card/Accordion'
import {Autocompletar, Input, Select} from './form'
import {Botao, BotaoAlterar, BotaoEnviar, BotaoExcluir, BotaoImprimir, BotaoPesquisar, BotaoSalvar} from './Botao'
import {Card} from "./card/Card";
import {Icone} from "./Icone";
import {Pagina} from "./pagina/Pagina";
import {Spinner} from "./Spinner";
import {CadastrarNome} from "./form/CadastrarNome";
import {Tabela} from "./tabela/Tabela.js"

export function getClasse(classe) {
    return !classe ? "" : classe.toString()+" ";
}

export {
    Accordion,
    Autocompletar,
    CadastrarNome,
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
    Tabela,
}