import {Card, Pagina} from "../../componentes";
import React from "react";

export default function ConsultasAgendadas() {
    return(
        <Pagina titulo={"Consultas Agendadas"}>
            <div className="row">
                <div className={"col-lg-12"}>
                    <Card titulo={"Ver Consultas Agendadas"}>
                        <h1>
                            Consultas Virão aqui. Lembrar que deve aparecer as consultas agendadas
                            do Titular e seus Dependentes
                        </h1>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}