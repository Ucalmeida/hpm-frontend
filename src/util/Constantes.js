const HttpVerbo = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
}

const Tipo = {
    COR_TEXTO: {
        PRIMARIO: ' text-primary',
        SECUNDARIO: ' text-secondary',
        SUCESSO: ' text-success',
        INFO: ' text-info',
        PERIGO: ' text-danger',
        ALERTA: ' text-warning'
    },
    COR_BOTAO: {
        PRIMARIO: ' btn-primary',
        SECUNDARIO: ' btn-secondary',
        SUCESSO: ' btn-success',
        INFO: ' btn-info',
        PERIGO: ' btn-danger',
        ALERTA: ' btn-warning'
    },
    ICONE: {
        ALTERAR: 'fas fa-retweet',
        ENVIAR: 'far fa-paper-plane',
        ERRO: 'far fa-times-circle',
        EXCLUIR: 'far fa-trash-alt',
        IMPRIMIR: 'fas fa-print',
        LIMPAR: 'fas fa-undo-alt',
        OK: 'far fa-check-circle',
        PDF: 'fas fa-file-pdf',
        PESQUISAR: 'fas fa-search',
        SALVAR: 'far fa-save',
        VOLTAR: 'fas fa-reply',
    },
    MSG: {
        ALERTA: 'Atenção. ',
        ERRO: 'Erro! Algo de errado aconteceu. ',
        INFO: 'INFO',
        SUCESSO: 'Operação realizada com sucesso! ',
    }
}

export {
    HttpVerbo,
    Tipo
}