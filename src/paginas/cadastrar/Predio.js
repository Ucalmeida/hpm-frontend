import React, {useEffect, useState} from "react";
import {Botao, BotaoSalvar, CadastrarNome, Card, Input, Pagina, Select, Spinner, Tabela} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";

export default function Predio(){
    const [objeto, setObjeto] = useState(
        {
            nome : '',
            predios: [],
            carregandoPredios : false,
            carregandoCadastrar : false
        }
    )

    const handleChange = (e) => {
        e.preventDefault()
        setObjeto({...objeto, [e.target.name]: e.target.value})
    }

    const handleBtnExcluir = async (e) => {
        await xfetch('/hpm/predio/excluir/' + e.target.value, {}, HttpVerbo.PUT)
            .then(json => {
                    if (typeof json !== "undefined" ? json.status === "OK" : false) {
                        ExibirMensagem('Prédio Excluído com Sucesso!', MSG.SUCESSO)
                    } else {
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                }
            )
        listarPredios();
    }

    const listarPredios = () => {
        setObjeto({...objeto, carregandoPredios: true, predios: []})
        xfetch('/hpm/predio/naoExcluidas',{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, predios: json.resultado, carregandoPredios: false})
                }
            )
    }

    useEffect( () => {
        listarPredios();
    }, [])

    const enviar = (e) => {
        e.preventDefault()
        setObjeto({...objeto, carregandoCadastrar: true})
        xfetch('/hpm/predio/cadastrar', objeto, HttpVerbo.POST)
            .then( json =>{
                    if(json.status === "OK"){
                        ExibirMensagem('Prédio Cadastrado Com Sucesso!', MSG.SUCESSO)
                        setObjeto({...objeto, nome: '', predios: []})
                        listarPredios();
                    }else{
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                    setObjeto({...objeto, carregandoCadastrar: false})
                }
            )
    }

    const colunas = [
        {text: "Nome" },
        {text: "Ações"}
    ]

    const dados = () => {
        return(
            objeto.predios.map((predio) => {
                return({
                    key: predio.valor,
                    'nome': predio.texto,
                    'acoes': <div>
                        <Botao cor={BOTAO.COR.PERIGO} onClick={handleBtnExcluir.bind(predio.valor)} value={predio.valor}>Excluir</Botao>
                    </div>
                })
            })
        )
    }

    let spinner = objeto.carregandoPredios ? <Spinner/> : ''
    let spinnerCadastrar = objeto.carregandoCadastrar ? <Spinner/> : ''
    return(
        <Pagina titulo = "Cadastrar Prédio">
            <div className="row animated--fade-in">
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">
                        {spinnerCadastrar}
                        <div className="row">
                            <div className="col-lg-12">
                                <Input
                                    type="text"
                                    label="Prédio"
                                    value={objeto.nome}
                                    onChange = {handleChange}
                                    name="nome"
                                    placeholder="Prédio"/>
                            </div>
                        </div>
                        <div className="align-items-end col-12">
                            <BotaoSalvar onClick={enviar} />
                        </div>
                    </Card>
                </div>
                <div className="col-lg-12">
                    <Card titulo="Prédios cadastrados">
                        <Tabela colunas={colunas} dados={dados()} pageSize={5} />
                        {spinner}
                    </Card>
                </div>
            </div>
        </Pagina>
    )
}