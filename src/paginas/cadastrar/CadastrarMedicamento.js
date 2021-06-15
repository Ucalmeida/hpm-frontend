import React from "react";
import {CadastrarNome} from "../../componentes";

export function CadastrarMedicamento() {
    return(
        <CadastrarNome
            url="/hpm/medicamento/cadastrar"
            urlListagem="/hpm/medicamento"
            label="Medicamento"
            labelListagem="Medicamentos cadastrados"
        />
    )
}