import React, {useEffect, useState} from "react";
import {Spinner} from "../Spinner";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";
import {Pagina} from "../pagina/Pagina";
import {Card} from "../card/Card";
import {Input} from "./Input";
import {Botao, BotaoSalvar} from "../Botao";
import PropTypes from 'prop-types';
import {Tabela} from "../tabela/Tabela";

function CadastrarNome({label, labelListagem, url, urlListagem, urlExcluir}) {
    const [objeto, setObjeto] = useState({
        nome: '',
        lista: [],
        carregando: false,
        carregandoSalvar: false
    })

    function handleChange(e) {
        e.preventDefault()
        setObjeto({...objeto, [e.target.name]: e.target.value})
    }

    const handleBtnExcluir = async (e) => {
        await xfetch(urlExcluir + e.target.value, {}, HttpVerbo.PUT)
            .then(json => {
                    if (typeof json !== "undefined" ? json.status === "OK" : false) {
                        ExibirMensagem('Exclusão Efetuada com Sucesso!', MSG.SUCESSO)
                    } else {
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                }
            )
        carregarSetores();
    }

    let spiner = objeto.carregando ? <Spinner/> : ''
    let spinnerSalvar = objeto.carregandoSalvar ? <Spinner/> : ''


    function carregarSetores() {
        console.log('Aqui')
        setObjeto({...objeto, carregando: true})
        xfetch(urlListagem, {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(dados => setObjeto({...objeto, lista: dados.resultado, carregando: false}))
            .catch(e => setObjeto({...objeto, carregando: false}))
    }

    useEffect( () => {
        carregarSetores();
    }, [])

    function enviar(e) {
        e.preventDefault()
        setObjeto({...objeto, carregandoSalvar: true})
        xfetch(url, objeto, HttpVerbo.POST)
            .then(res => {
                if (res.status === "OK") {
                    ExibirMensagem('Cadastro Efetuado Com Sucesso!', MSG.SUCESSO)
                    setObjeto({...objeto, nome: '', lista: []})
                    carregarSetores();
                } else {
                    ExibirMensagem(res.message, MSG.ERRO)
                    setObjeto({...objeto, carregandoSalvar: false})
                }
            })
    }

    const colunas = [
        {text: "Nome" },
        {text: "Ações"}
    ]

    const dados = () => {
        return(
            objeto.lista.map((lista) => {
                return({
                    key: lista.valor,
                    'nome': lista.texto,
                    'acoes': <div>
                        <Botao cor={BOTAO.COR.PERIGO} onClick={handleBtnExcluir.bind(lista.valor)} value={lista.valor}>Excluir</Botao>
                    </div>
                })
            })
        )
    }

    return (
        <Pagina titulo={"Cadastrar " + label}>
            <div className="row animated--fade-in">
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">
                        {spinnerSalvar}
                        <Input
                            type="text"
                            onChange={handleChange}
                            value={objeto.nome}
                            name="nome"
                            label={label}
                            placeholder={label} required/>
                        <div className="align-items-end col-12">
                            <BotaoSalvar onClick={enviar}/>
                        </div>
                    </Card>
                </div>
                <div className="col-lg-12">
                    <Card titulo={labelListagem}>
                        {spiner}
                        <Tabela colunas={colunas} dados={dados()} />
                    </Card>
                </div>
            </div>
        </Pagina>
    )
}

CadastrarNome.propTypes = {
    label: PropTypes.string,
    url: PropTypes.string,
    urlListagem: PropTypes.string,
    urlExcluir: PropTypes.string,
    labelListagem: PropTypes.string
}

export {CadastrarNome}