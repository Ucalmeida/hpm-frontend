import React from "react";
import Pagina from "../../componentes/pagina/Pagina";
import Input from "../../componentes/form/Input";
import Card from "../../componentes/Card";

function CadastrarPredio() {
    return (
        <Pagina>
            <div className="form-group col-lg-12">
                <Card>
                    <Input className = "" label = "Nome" />
                </Card>
            </div>
        </Pagina>
    );
}

export default CadastrarPredio;