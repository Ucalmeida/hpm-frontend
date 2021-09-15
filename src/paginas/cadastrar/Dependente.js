import React, {useState} from "react";
import {Autocomplete, BotaoPesquisar, BotaoSalvar, Card, Pagina} from "../../componentes";
import {xfetch} from "../../util";

export default function Dependente(){
    const [objeto, setObjeto] = useState(
        {
            idPessoa: null
        }
    )

    function selecionarPessoa(idPessoa){
        setObjeto({...objeto, idPessoa: idPessoa})
    }
    function verificarVinculo(){
        xfetch()
    }

    return(
        <Pagina titulo="Cadastrar Dependente">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">
                        <div className="row">
                            <div className="col-lg-8">
                                <Autocomplete tamanho="6" url="/hpm/pessoa/" label="Nome ou CPF do titular:" placeholder="Digite aqui"  onSelect={selecionarPessoa}/>
                            </div>
                            <div className="col-lg-4 mt-4 mb-4">
                                <BotaoPesquisar onClick={verificarVinculo}>addasdasdasdsd</BotaoPesquisar>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Pagina>
    )

}
