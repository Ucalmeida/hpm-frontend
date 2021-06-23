import React from "react";
import {CadastrarNome} from "../../componentes";

export default function InstituicaoConvenio() {
    return(
        <CadastrarNome
            url="/hpm/instituicao/cadastrar"
            urlListagem="/hpm/instituicao" 
            label="Instituição/Convênio"
            labelListagem="Instituições e convênios cadastrados"
        />
    )
}