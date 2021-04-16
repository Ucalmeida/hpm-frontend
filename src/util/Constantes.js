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
        ERRO: 'far fa-times-circle',
        PDF: 'fas fa-file-pdf',
        SALVAR: 'far fa-save'
    },
    COR_TEXTO: {
        PRIMARIO: ' text-primary',
        SECUNDARIO: ' text-secondary',
        SUCESSO: 'text.success',
        INFO: ' text-info',
        PERIGO: ' text-danger',
        AVISO: ' text-warning'
    },
    COR_BOTAO: {
        PRIMARIO: ' btn-primary',
        SECUNDARIO: ' btn-secondary',
        SUCESSO: 'btn-success',
        INFO: ' btn-info',
        PERIGO: ' btn-danger',
        AVISO: ' btn-warning'
    }
}

export {
    HttpVerbo,
    Tipo
}