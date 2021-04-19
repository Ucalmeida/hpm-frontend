import React from "react";
import Pagina from "../../componentes/pagina/Pagina";
import {Card} from "react-bootstrap";
import Input from "../../componentes/form/Input";

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