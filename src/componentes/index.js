import {Accordion} from './card/Accordion'
import {Autocompletar, Autocomplete, Input, Select} from './form'
import {Botao, BotaoAlterar, BotaoEnviar, BotaoExcluir, BotaoImprimir, BotaoPesquisar, BotaoSalvar} from './Botao'
import {Card} from "./card/Card";
import {Icone} from "./Icone";
import {Pagina} from "./pagina/Pagina";
import {Spinner} from "./Spinner";
import {CadastrarNome} from "./form/CadastrarNome";
import {Tabela} from "./tabela/Tabela.js"
import {Calendario} from "./Calendario";
import {EditorTexto} from "./EditorTexto";

export function getClasse(classe) {
    return !classe ? "" : classe.toString()+" ";
}

export {
    Accordion,
    Autocompletar,
    Autocomplete,
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
    Calendario,
    EditorTexto
}