import {ExibirMensagem} from './ExibirMensagem';
import {xfetch, Logado, ValidaToken} from './Util';
import {HoraAtual, DataAtual, DataHoraAtual, TempoTranscorridoMilisegParaHoraData, ConverterMilisegundoParaHoraDias} from "./DataHora";
import {RemoverCaracteresEspeciais, RemoverCaracteresEspeciaisMinusculo} from "./Replace";

export {
    ExibirMensagem,
    xfetch,
    Logado,
    RemoverCaracteresEspeciais, RemoverCaracteresEspeciaisMinusculo,
    ValidaToken,
    HoraAtual, DataAtual, DataHoraAtual, TempoTranscorridoMilisegParaHoraData, ConverterMilisegundoParaHoraDias
}