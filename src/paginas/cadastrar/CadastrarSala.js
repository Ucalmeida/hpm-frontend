import React, {useState} from "react";
import {BotaoSalvar, Card, Input, Pagina, Select} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";

function CadastrarSala() {
    const [objeto , setObjeto] = useState(
        {
            nome: '',
            idPiso:'',
            salas: []
        }
    )

    let selecionarPiso = (e) => {
        objeto.idPiso = e.value
        listarSalasPorPiso()
    }

    const listarSalasPorPiso = () => {
        xfetch('/hpm/sala/' + objeto.idPiso,{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, salas: json.resultado});
                }
            )
    }


    let handleChange = (e) => {
        e.preventDefault()
        setObjeto({...objeto, nome: e.target.value})
    }

    const enviar = (e) => {
        e.preventDefault()

        xfetch('/hpm/sala/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                    if(json.status === "OK"){
                        ExibirMensagem('Sala Cadastrada Com Sucesso!', MSG.SUCESSO)
                        setObjeto({ idPiso: '', salas: []})
                        listarSalasPorPiso()
                    }else{
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                    // setObjeto({...objeto, carregandoCadastrar: false})
                }
            )
    }

    let salas = objeto.salas;
    return(
        <Pagina titulo = "Cadastrar Sala">
            <div className="row animated--fade-in">
                <div className="col-lg-6">
                    <Card titulo="Cadastrar">
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Piso</label>
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
                    <Card titulo="Salas Cadastradas No Piso Selecionado">
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