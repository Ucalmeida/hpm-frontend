const HttpVerbo = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
}

const BOTAO = {
    COR: {
        PRIMARIO: ' btn-primary',
        SECUNDARIO: ' btn-secondary',
        SUCESSO: ' btn-success',
        INFO: ' btn-info',
        PERIGO: ' btn-danger',
        ALERTA: ' btn-warning'
    },
    TAMANHO: {
        EXTRA_PEQUENO: ' btn-xs',
        PEQUENO: ' btn-sm',
        MEDIO: '',
        GRANDE: ' btn-lg',
        EXTRA_GRANDE: ' btn-xl'
    }
}

const CARD = {
    COR: {
        PRIMARIO: ' card-primary',
        SECUNDARIO: ' card-secondary',
        SUCESSO: ' card-success',
        INFO: ' card-info',
        PERIGO: ' card-danger',
        ALERTA: ' card-warning'
    }
}

const ICONE = {
        ALTERAR: 'fas fa-retweet',
        CANCELAR: 'far fa-times-circle',
        EDITAR: 'fas fa-pencil',
        ENVIAR: 'far fa-paper-plane',
        ERRO: 'far fa-times-circle',
        EXCLUIR: 'far fa-trash-alt',
        INFO: 'fas fa-info-circle',
        IMPRIMIR: 'fas fa-print',
        LIMPAR: 'fas fa-undo-alt',
        OK: 'far fa-check-circle',
        PDF: 'fas fa-file-pdf',
        PESQUISAR: 'fas fa-search',
        SALVAR: 'far fa-save',
        VOLTAR: 'fas fa-reply',
}

const TEXTO = {
    COR: {
        PRIMARIO: ' text-primary',
        SECUNDARIO: ' text-secondary',
        SUCESSO: ' text-success',
        INFO: ' text-info',
        PERIGO: ' text-danger',
        ALERTA: ' text-warning'
    },
    TAMANHO: {
        PEQUENO: ' text-sm',
        MEDIO: '',
        GRANDE: ' text-lg'
    }
}

const MSG = {
    ALERTA: 'Atenção. ',
    ERRO: 'Erro! Algo de errado aconteceu. ',
    INFO: 'INFO',
    SUCESSO: 'Operação realizada com sucesso! ',
}

export {
    HttpVerbo,
    BOTAO,
    CARD,
    ICONE,
    MSG,
    TEXTO,
}
