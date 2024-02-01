import React, {useEffect, useState} from 'react'
import {xfetch} from "../../util/Util";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";
import {Botao, BotaoSalvar} from "../../componentes/Botao";
import {ExibirMensagem} from "../../util";
import {Card, Input, Pagina, Spinner, Tabela} from "../../componentes";


export default function Objeto() {
    const [objeto, setObjeto] = useState({
        nome: '',
        objetos: [],
        carregandoObjetos: false,
        carregandoCadastrar: false
    });

    const handleChange = (e) => {
        e.preventDefault()
        setObjeto({...objeto, [e.target.name]: e.target.value})
    }

    const handleBtnExcluir = async (e) => {
        await xfetch('/hpm/objeto/excluir/' + e.target.value, {}, HttpVerbo.PUT)
            .then(json => {
                    if (typeof json !== "undefined" ? json.status === "OK" : false) {
                        ExibirMensagem('Objeto Excluído com Sucesso!', MSG.SUCESSO)
                    } else {
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                }
            )
        listarObjetos();
    }

    useEffect(() => {
        listarObjetos();
    }, [])

    const listarObjetos = () => {
        setObjeto({...objeto, carregandoObjetos: true})
        xfetch('/hpm/objeto/naoExcluidas', {}, HttpVerbo.GET)
            .then(resultado => resultado.json())
            .then(json => setObjeto({...objeto, objetos: json.resultado, carregandoObjetos:false}))
            .catch(e => setObjeto({...objeto, carregandoObjetos: false}))
    }

    const enviar = (e) => {
        e.preventDefault()
        setObjeto({...objeto, carregandoCadastrar: true})
        xfetch('/hpm/objeto', objeto, HttpVerbo.POST)
            .then(json => {
                if (json.status === "OK") {
                    ExibirMensagem('Objeto Cadastrado com Sucesso',MSG.SUCESSO);
                    setObjeto({...objeto, nome: '', objetos: []});
                    listarObjetos();
                } else {
                    ExibirMensagem("Erro", MSG.ERRO);
                }
                setObjeto({...objeto, carregandoCadastrar: false});
            }
        )
    }

    const colunas = [
        {text: "Nome"},
        {text: "Ações"}
    ]

    const dados = () => {
        return(
            objeto.objetos.map((objeto) => {
                return({
                    key: objeto.valor,
                    'nome': objeto.texto,
                    'acoes': <div>
                        <Botao cor={BOTAO.COR.PERIGO} onClick={handleBtnExcluir.bind(objeto.valor)} value={objeto.valor}>Excluir</Botao>
                    </div>
                })
            })
        )
    }

    let spinner = '';
    if (objeto.carregandoCadastrar) {
        spinner =
            <Spinner />
    }
    return (
        <Pagina titulo= "Cadastrar Objeto">
            <div className="row animated--fade-in">
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">
                        <Input
                            type="text"
                            onChange={handleChange}
                            value={objeto.nome}
                            name="nome"
                            label="Nome Objeto"
                            placeholder="Nome Objeto"/>

                        <div className="align-items-end col-12">
                            <BotaoSalvar onClick={enviar}/>
                        </div>
                    </Card>
                </div>
                <div className="col-lg-12">
                    <Card titulo="Objetos cadastrados">
                        <Tabela colunas={colunas} dados={dados()} pageSize={5} />
                        {spinner}
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}