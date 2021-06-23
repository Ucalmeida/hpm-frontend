import React, {useEffect, useState} from "react";
import {BotaoSalvar, Card, Input, Pagina, Select, Spinner} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";

export default function Exame() {
    const [objeto, setObjeto] = useState(
        {
            nome: '',
            descricao: '',
            exames: [],
            carregandoExames: false,
            carregandoCadastrar: false
        }
    )

    useEffect(() =>{
        listarExames();
    }, [])

    let handleChange = (e) => {
        e.preventDefault()
        setObjeto({...objeto, nome: e.target.value})
    }

    let handleChange1 = (e) => {
        e.preventDefault()
        setObjeto({...objeto, descricao: e.target.value})
    }

    const listarExames = () => {
        setObjeto({...objeto,exames: [], carregandoExames: true})
        xfetch('/hpm/exame', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                setObjeto({...objeto, exames: json.resultado, carregandoExames: false})
            })
    }

    const enviar = (e) => {
        e.preventDefault()
        setObjeto({...objeto, carregandoCadastrar: true})
        xfetch('/hpm/exame/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                    if(json.status === "OK"){
                        ExibirMensagem('Exame Cadastrado Com Sucesso!', MSG.SUCESSO)
                        setObjeto({ nome: '', descricao: '', exames: []})
                        listarExames()
                    }else{
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                    setObjeto({...objeto, carregandoCadastrar: false})
                }
            )
    }


    let spinner = objeto.carregandoExames ? <Spinner/> : ''
    let spinnerCadastrar = objeto.carregandoCadastrar ? <Spinner/> : ''
    let exames = objeto.exames;
    return(
        <Pagina titulo="Cadastrar Exame">
            <div className="row animated--fade-in">
                <div className="col-lg-6">
                    <Card titulo="Cadastrar">
                        <div className="col-lg-12">
                            {spinnerCadastrar}
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <Input
                                    type="text"
                                    label="Exame"
                                    value={objeto.nome}
                                    onChange = {handleChange}
                                    name="nome"
                                    placeholder="Exame"/>
                            </div>
                            <div className="col-lg-6">
                                <label>Descrição</label>
                                <textarea
                                    className={"form-control"}
                                    rows={"2"}
                                    value={objeto.descricao}
                                    onChange={handleChange1}
                                    name="descricao"
                                    placeholder= "Descrição"
                                />
                            </div>
                        </div>

                        <div className="align-items-end col-12">
                            <BotaoSalvar onClick={enviar} />
                        </div>

                    </Card>
                </div>
                <div className="col-lg-6">
                    <Card titulo="Exames cadastrados">
                        {spinner}
                        <ul className={"list-unstyled"} style={{columns: 3}}>
                            {exames.map((v, k) => {
                                return <li className="flex-fill" key={k}> {v.nome}</li>
                            })}
                        </ul>
                    </Card>
                </div>
            </div>
        </Pagina>
    )
};