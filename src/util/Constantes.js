const HttpVerbo = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
}

const Tipo = {
    MSG: {
        ERRO: 'ERRO',
        SUCESSO: 'SUCESSO',
        INFO: 'INFO'
    },
    ICONE: {
        IMPRIMIR: 'fas fa-print',
        OK: 'far fa-check-circle',
        ERRO: 'far fa-times-circle text-danger',
    }
}

export {
    HttpVerbo,
    Tipo
}