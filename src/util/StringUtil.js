export function ConverterCaracteresEspeciais(texto) {
    return  texto.normalize('NFD').replace(/[^a-zA-Zs]/g, "").replace(/\s/g, "_");
}
export function ConverterCaracteresEspeciaisSemEspaco(texto) {
    return  texto.normalize('NFD').replace(/[^a-zA-Zs]/g, "");
}
export function ConverterCaracteresEspeciaisMinusculo(texto) {
    return  texto.normalize('NFD').replace(/[^a-zA-Zs\s]/g, "").replace(/\s/g, "_").toLowerCase();
}

export function CompararArrayObjetos(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // propriedade não existe no objeto
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}