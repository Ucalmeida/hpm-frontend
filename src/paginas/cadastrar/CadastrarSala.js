import React, {useState} from "react";
import {BotaoSalvar, Card, Input, Pagina, Select, Spinner} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";

function CadastrarSala() {
    const [objeto , setObjeto] = useState(
        {
            nome: '',
            idPiso:'',
            salas: [],
            carregandoSalas: false,
            carregandoCadastrar: false
        }
    )

    let selecionarPiso = (e) => {
        objeto.idPiso = e.value
        listarSalasPorPiso()
    }

    const listarSalasPorPiso = () => {
        setObjeto({...objeto, carregandoSalas: true, salas: []})
        xfetch('/hpm/sala/' + objeto.idPiso,{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, salas: json.resultado,carregandoSalas: false});
                }
            )
    }

    let handleChange = (e) => {
        e.preventDefault()
        setObjeto({...objeto, nome: e.target.value})
    }

    const enviar = (e) => {
        e.preventDefault()
        setObjeto({...objeto, carregandoCadastrar: true})
        xfetch('/hpm/sala/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                    if(json.status === "OK"){
                        ExibirMensagem('Sala Cadastrada Com Sucesso!', MSG.SUCESSO)
                        setObjeto({ idPiso: '', salas: []})
                        listarSalasPorPiso()
                    }else{
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                     setObjeto({...objeto, carregandoCadastrar: false})
                }
            )
    }

   let spinner = objeto.carregandoSalas ? <Spinner/> : ''
   let spinnerCadastrar = objeto.carregandoCadastrar ? <Spinner/> : ''
    let salas = objeto.salas;
    return(
        <Pagina titulo = "Cadastrar Sala">
            <div className="row animated--fade-in">
                <div className="col-lg-6">
                    <Card titulo="Cadastrar">
                        <div className="col-lg-12">
                            {spinnerCadastrar}
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Prédio - Piso</label>
                                <Select
                                    funcao={selecionarPiso}
                                    nome="idPiso"
                                    url={"/hpm/piso/opcoes"} />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    type="text"
                                    label="Sala"
                                    value={objeto.nome}
                                    onChange = {handleChange}
                                    name="nome"
                                    placeholder="Sala"/>
                            </div>
                        </div>
                        <div className="align-items-end col-12">
                            <BotaoSalvar onClick={enviar} />
                        </div>
                    </Card>
                </div>
                <div className="col-lg-6">
                    <Card titulo="Salas cadastradas no piso selecionado">
                        {spinner}
                        <ul className={"list-unstyled"} style={{columns: 3}}>
                            {salas.map((v, k) => {
                                return <li className="flex-fill" key={k}> {v.nome}</li>
                            })}
                        </ul>
                    </Card>
                </div>
            </div>
        </Pagina>
    )

}
export {CadastrarSala};