import React from "react";
import {Botao, Card, Pagina, Select} from "../../componentes";

export function SetorFuncaoAcoes() {
    return (
        <Pagina titulo="Setor | Função | Ações" subTitulo="Vincula ações ao setor-função">
            <div className="row">
                <div className="col-lg-6">

                    <Card titulo="Vincular">
                        <div className="col-lg-12">
                        </div>
                        <div className="col-lg-12">
                            <Select
                                url="/hpm/setorFuncao/opcoes"
                                funcao={() => {}}
                                nome="setor"
                                label="Setor | Função"/>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 text-lg-right mt-2 mb-2">
                                <Botao className="" cor="success" onClick={() => {}}>
                                    Adicionar
                                </Botao>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-lg-6">
                    <Card titulo="Ações do setor-função">
                        <ul className={"list-unstyled"} style={{columns: 3}}>

                        </ul>
                    </Card>
                </div>
            </div>
        </Pagina>
    )
}