import React from "react";
import {CadastrarNome} from "../../componentes";

export function CadastrarInstituicaoConvenio() {
    return(
        <CadastrarNome
            url="/hpm/instituicao/cadastrar"
            urlListagem="/hpm/instituicao" 
            label="Instituição/Convênio"
            labelListagem="Instituições e convênios cadastrados"
        />
    )
}