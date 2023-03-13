import React, {useEffect, useState} from "react";
import {Botao, BotaoSalvar, Card, Input, Pagina, Spinner, Tabela} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";

export default function Funcao() {
    const [objeto, setObjeto] = useState(
        {
            nome: '',
            funcoes: [],
            carregandoFuncoes: false,
            carregandoCadastrar: false
        }
    )

    const handleChange = (e) => {
        e.preventDefault()
        setObjeto({...objeto, [e.target.name]: e.target.value})
    }

    const handleBtnExcluir = async (e) => {
        console.log("ID:", e.target.value);
        await xfetch('/hpm/funcao/excluir/' + e.target.value, {}, HttpVerbo.PUT)
            .then(json => {
                    if (typeof json !== "undefined" ? json.status === "OK" : false) {
                        ExibirMensagem('Função Excluída com Sucesso!', MSG.SUCESSO)
                    } else {
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                }
            )
        listarFuncoes();
    }

    useEffect(() => {
        listarFuncoes();
    }, [])

    const listarFuncoes = () => {
        setObjeto({...objeto,  carregandoFuncoes: true})
        xfetch('/hpm/funcao/naoExcluidas', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                setObjeto({...objeto, funcoes: json.resultado, carregandoFuncoes: false})
            })
    }

    const enviar = (e) => {
        e.preventDefault()
        setObjeto({...objeto, carregandoCadastrar: true})
        xfetch('/hpm/funcao', objeto, HttpVerbo.POST)
            .then(json => {
                    if(json.status === "OK"){
                        ExibirMensagem('Função Cadastrada Com Sucesso!', MSG.SUCESSO)
                        setObjeto({...objeto, nome: '', funcoes: []})
                        listarFuncoes();
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
            objeto.funcoes.map((funcao) => {
                return({
                    key: funcao.valor,
                    'nome': funcao.texto,
                    'acoes': <div>
                        <Botao cor={BOTAO.COR.PERIGO} onClick={handleBtnExcluir.bind(funcao.valor)} value={funcao.valor}>Excluir</Botao>
                    </div>
                })
            })
        )
    }


    let spinner = objeto.carregandoFuncoes ? <Spinner/> : ''
    let spinnerCadastrar = objeto.carregandoCadastrar ? <Spinner/> : ''
    return(
        <Pagina titulo="Cadastrar Exame">
            <div className="row animated--fade-in">
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">
                        <div className="col-lg-12">
                            {spinnerCadastrar}
                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                <Input
                                    type="text"
                                    label="Função"
                                    value={objeto.nome}
                                    onChange = {handleChange}
                                    name="nome"
                                    placeholder="Função"/>
                            </div>
                        </div>

                        <div className="align-items-end col-12">
                            <BotaoSalvar onClick={enviar} />
                        </div>

                    </Card>
                </div>
                <div className="col-lg-12">
                    <Card titulo="Funções cadastradas">
                        <Tabela colunas={colunas} dados={dados()} pageSize={5} />
                        {spinner}
                    </Card>
                </div>
            </div>
        </Pagina>
    )
};