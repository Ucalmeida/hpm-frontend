import React from "react";
import {CadastrarNome} from "../../componentes";

export default function Predio(){
    return(
        <CadastrarNome url="/hpm/predio/cadastrar" urlListagem="/hpm/predio" label="Prédio" labelListagem="Prédios cadastrados"/>
    )
}