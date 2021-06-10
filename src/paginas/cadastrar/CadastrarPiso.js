import React, {useState} from "react";
import {BotaoSalvar, Card, Input, Pagina, Select} from "../../componentes";
import {xfetch} from "../../util";
import {HttpVerbo} from "../../util/Constantes";


function CadastrarPiso(){
    const [objeto, setObjeto] = useState(
        {
            nome : '',
            idObjeto : null,
            pisos : [],
            carregandoPisos : false,
            carregandoCadastrar : false
        }
    )

    let selecionarPredio = (e) => {
        console.log(e)
        objeto.idObjeto = e.value
        listarPisosPorPredio()
    }

    const listarPisosPorPredio = () => {
        setObjeto({...objeto, carregandoPisos: true, pisos: []})
        xfetch('/hpm/piso/' + objeto.idObjeto,{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, pisos: json.resultado, carregandoPisos: false})
                }
            )
    }

    return(
        <Pagina titulo = "Cadastrar Piso">
            <div className="row animated--fade-in">
                <div className="col-lg-6">
                    <Card titulo="Cadastrar">
                        <div className="row">
                            <div className="col-lg-6">
                                <Select
                                    label="Prédio"
                                    funcao={selecionarPredio}
                                    nome="idObjeto"
                                    url={"/hpm/predio/opcoes"} />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    type="text"
                                    label="Piso"
                                    value={objeto.nome}
                                   // onChange = {handleChange}
                                    name="nome"
                                    placeholder="Piso"/>
                            </div>
                        </div>
                        <div className="align-items-end col-12">
                            {/*<BotaoSalvar onClick={} />*/}
                        </div>
                    </Card>
                </div>
                <div className="col-lg-6">
                    <Card titulo="Pisos No Predio Selecionado">

                        <ul className={"list-unstyled"} style={{columns: 3}}>
                            {/*{tipos.map((v, k) => {*/}
                            {/*    return <li className="flex-fill" key={k}> {v.nome}</li>*/}
                            {/*})}*/}
                        </ul>
                    </Card>
                </div>
            </div>
        </Pagina>
    )

}

export {CadastrarPiso};