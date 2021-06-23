import React, {useState} from "react";
import {BotaoSalvar, Card, Input, Pagina, Select, Spinner} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";


export default function Piso(){
    const [objeto, setObjeto] = useState(
        {
            nome : '',
            idPredio : null,
            pisos : [],
            carregandoPisos : false,
            carregandoCadastrar : false
        }
    )

    let selecionarPredio = (e) => {
        objeto.idPredio = e.value
        listarPisosPorPredio()
        console.log(objeto)
    }

    const listarPisosPorPredio = () => {
        setObjeto({...objeto, carregandoPisos: true, pisos: []})
        xfetch('/hpm/piso/' + objeto.idPredio,{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, pisos: json.resultado, carregandoPisos: false})
                }
            )
    }

    let handleChange = (e) => {
        e.preventDefault()
        setObjeto({...objeto, nome: e.target.value})
    }

    let enviar = (e) => {
        e.preventDefault()
        setObjeto({...objeto, carregandoCadastrar: true})
        xfetch('/hpm/piso/cadastrar', objeto, HttpVerbo.POST)
            .then( json =>{
                if(json.status === "OK"){
                    ExibirMensagem('Piso Cadastrado Com Sucesso!', MSG.SUCESSO)
                    setObjeto({ idPredio: '', pisos: []})
                    listarPisosPorPredio()
                }else{
                    ExibirMensagem(json.message, MSG.ERRO)
                }
                setObjeto({...objeto, carregandoCadastrar: false})
            }
        )
    }

    let spinner = objeto.carregandoPisos ? <Spinner/> : ''
    let spinnerCadastrar = objeto.carregandoCadastrar ? <Spinner/> : ''
    let pisos = objeto.pisos
    return(
        <Pagina titulo = "Cadastrar Piso">
            <div className="row animated--fade-in">
                <div className="col-lg-6">
                    <Card titulo="Cadastrar">
                        {spinnerCadastrar}
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Prédio</label>
                                <Select
                                    funcao={selecionarPredio}
                                    nome="idPredio"
                                    url={"/hpm/predio/opcoes"} />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    type="text"
                                    label="Piso"
                                    value={objeto.nome}
                                    onChange = {handleChange}
                                    name="nome"
                                    placeholder="Piso"/>
                            </div>
                        </div>
                        <div className="align-items-end col-12">
                            <BotaoSalvar onClick={enviar} />
                        </div>
                    </Card>
                </div>
                <div className="col-lg-6">
                    <Card titulo="Pisos cadastrados no prédio selecionado">
                        {spinner}
                        <ul className={"list-unstyled"} style={{columns: 3}}>
                            {pisos.map((v, k) => {
                                return <li className="flex-fill" key={k}> {v.nome}</li>
                            })}
                        </ul>
                    </Card>
                </div>
            </div>
        </Pagina>
    )
}
