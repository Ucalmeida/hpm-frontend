import React, {useEffect, useState} from "react";
import {Spinner} from "../Spinner";
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";
import {Pagina} from "../pagina/Pagina";
import {Card} from "../card/Card";
import {Input} from "./Input";
import {BotaoSalvar} from "../Botao";
import PropTypes from 'prop-types';

function CadastrarNome({label, labelListagem, url, urlListagem}) {
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
                    let lista = objeto.lista
                    lista.push(res.resultado)
                    ExibirMensagem('Cadastro Efetuado Com Sucesso!', MSG.SUCESSO)
                    setObjeto({...objeto, lista: lista, nome: ''})
                } else {
                    ExibirMensagem(res.message, MSG.ERRO)
                    setObjeto({...objeto, carregandoSalvar: false})
                }
            })
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
                        <ul className={"list-unstyled"} style={{columns: 3}}>
                            {objeto.lista.map((v, k) => {
                                return <li className="flex-fill" key={k}> {v.nome}</li>
                            })}
                        </ul>
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
    labelListagem: PropTypes.string
}

export {CadastrarNome}