import React from 'react'
import {CadastrarNome} from "../../componentes";

export default function Perfil() {

    return (
        <CadastrarNome
            url="/hpm/perfil"
            urlListagem="/hpm/perfil/naoExcluidas"
            urlExcluir="/hpm/perfil/excluir/"
            label="Perfil"
            labelListagem="Perfis criados" />
    );
}