
export function HoraAtual() {
    return new Date().toLocaleString().split(" ")[1];
}

export function DataAtual() {
    return new Date().toLocaleString().split(" ")[0];
}

export function DataHoraAtual() {
    return DataAtual() +" "+ HoraAtual()
}

export function ConverterMilisegundoParaHoraDias (milisegundos) {

    let segundos = Math.floor((milisegundos / 1000) % 60),
        minutos = Math.floor((milisegundos / (1000 * 60)) % 60),
        horas = Math.floor((milisegundos / (1000 * 60 * 60)) % 24);

    horas = (horas < 10) ? "0" + horas : horas;
    minutos = (minutos < 10) ? "0" + minutos : minutos;
    segundos = (segundos < 10) ? "0" + segundos : segundos;

    return horas + ":" + minutos + ":" + segundos;
}

export function TempoTranscorridoMilisegParaHoraData (tempo) {
    const segundos = Math.floor((tempo / 1000) % 60),
        minutos = Math.floor((tempo / (1000 * 60)) % 60),
        horas = Math.floor((tempo / (1000 * 60 * 60)) % 24),
        dias = Math.floor(tempo / (1000 * 60 * 60 * 24) % 24);

    if (dias > 0) return dias + "d";
    if (horas > 0) return horas + "h";
    if (minutos > 0) return minutos + "m";
    return segundos + "s";
}

export function FormatarDataHora (dataHora) { // 2021-06-21T11:46:32.081
    return (
        dataHora.substring(8,10) + '/' +
        dataHora.substring(5,7) + '/' +
        dataHora.substring(0,4) + ' às ' +
        dataHora.substring(11,19)
    )
}