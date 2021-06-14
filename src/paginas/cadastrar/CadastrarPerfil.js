import React from 'react'
import {CadastrarNome} from "../../componentes";

export function CadastrarPerfil() {

    return (
        <CadastrarNome
            url="/hpm/perfil"
            label="Perfil"
            labelListagem="Perfis criados"
            urlListagem="/hpm/perfil"/>
    );
}