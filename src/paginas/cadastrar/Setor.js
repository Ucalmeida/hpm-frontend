import React from "react";
import {CadastrarNome} from "../../componentes";

export default function Setor() {
    return(
        <CadastrarNome
            url="/hpm/setor"
            urlListagem="/hpm/setor/naoExcluidas"
            urlExcluir="/hpm/setor/excluir/"
            label="Setor"
            labelListagem="Setores cadastrados"
        />
    )
}