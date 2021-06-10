import React from "react";
import {CadastrarNome} from "../../componentes";

export function CadastrarPredio(){
    return(
        <CadastrarNome url="/hpm/predio/cadastrar" urlListagem="/hpm/predio" label="Prédio" labelListagem="Prédios Cadastrados"/>
    )
}