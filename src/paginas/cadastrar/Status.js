import React, {useState} from "react";
import {BotaoSalvar, Card, Input, Pagina, Select, Spinner} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";

export default function Status(){
    const [objeto, setObjeto] = useState(
        {
            nome: "",
            idObjeto: null,
            status: [],
            carregandoStatus: false,
            carregandoCadastrar: false
        }
    )

    let selecionarObjeto = (e) => {
        objeto.idObjeto = e.value
        listarStatusPorObjeto();
    }

    const listarStatusPorObjeto = () => {
        setObjeto({...objeto, carregandoStatus: true, status: []})
        xfetch('/hpm/status/' + objeto.idObjeto,{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, status: json.resultado, carregandoStatus: false})
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
        xfetch('/hpm/status/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                    if(json.status === "OK"){
                        ExibirMensagem('Status Cadastrado Com Sucesso!', MSG.SUCESSO)
                        setObjeto({ idObjeto: '', status: []})
                        listarStatusPorObjeto()
                    }else{
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                    setObjeto({...objeto, carregandoCadastrar: false})
                }
            )
    }

    let spinner = objeto.carregandoStatus ? <Spinner/> : ''
    let spinnerCadastrar = objeto.carregandoCadastrar ? <Spinner/> : ''
    let status = objeto.status;
    return(
        <Pagina titulo="Cadastrar Status">
            <div className="row animated--fade-in">
                <div className="col-lg-6">
                    <Card titulo="Cadastrar">
                        <div className="col-lg-12">
                            {spinnerCadastrar}
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Objeto</label>
                                <Select
                                    funcao={selecionarObjeto}
                                    nome="idObjeto"
                                    url={"/hpm/objeto/opcoes"} />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    type="text"
                                    label="Status"
                                    value={objeto.nome}
                                    onChange = {handleChange}
                                    name="nome"
                                    placeholder="Status"/>
                            </div>
                        </div>
                        <div className="align-items-end col-12">
                            <BotaoSalvar onClick={enviar} />
                        </div>
                    </Card>
                </div>
                <div className="col-lg-6">
                    <Card titulo="Status cadastrados no objeto selecionado">
                        {spinner}
                        <ul className={"list-unstyled"} style={{columns: 3}}>
                            {status.map((v, k) => {
                                return <li className="flex-fill" key={k}> {v.nome}</li>
                            })}
                        </ul>
                    </Card>
                </div>
            </div>
        </Pagina>
    )
}
