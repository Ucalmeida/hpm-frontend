import React from "react";
import {Card, Input, Pagina} from "../../componentes";

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

export {CadastrarPredio};