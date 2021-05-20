import React, {useEffect, useState} from "react";
import {BotaoSalvar, Card, Pagina, Spinner} from "../../componentes";
import {Input} from '../../componentes/form'
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";

export function CadastrarSetor() {

    const [objeto, setObjeto] = useState({
        nome: '',
        setores: [],
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
        xfetch("/hpm/setor", {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(dados => setObjeto({...objeto, setores: dados.resultado, carregando: false}))
            .catch(e => setObjeto({...objeto, carregando: false}))
    }

    useEffect( () => {
        carregarSetores();
    }, [])

    function enviar(e) {
        e.preventDefault()
        setObjeto({...objeto, carregandoSalvar: true})
        xfetch("/hpm/setor", objeto, HttpVerbo.POST)
            .then(res => {
                if (res.status === "OK") {
                    let lista = objeto.setores
                    lista.push(res.resultado)
                    setObjeto({...objeto, setores: lista, nome: ''})
                } else {
                    ExibirMensagem(res.message, MSG.ERRO)
                    setObjeto({...objeto, carregandoSalvar: false})
                }
            })
    }

    return (
        <Pagina titulo="Cadastrar Setor">
            <div className="row animated--fade-in">
                <div className="col-lg-4">
                    <Card>
                        {spinnerSalvar}
                        <Input
                            type="text"
                            onChange={handleChange}
                            value={objeto.nome}
                            name="nome"
                            label="Setor"
                            placeholder="Setor" required/>
                        <div className="align-items-end col-12">
                            <BotaoSalvar onClick={enviar}/>
                        </div>
                    </Card>
                </div>
                <div className="col-lg-8">
                    <Card titulo="Setores cadastrados">
                        {spiner}
                        <ul className={"list-unstyled"} style={{columns: 3}}>
                            {objeto.setores.map((v, k) => {
                                return <li className="flex-fill" key={k}> {v.nome}</li>
                            })}
                        </ul>
                    </Card>
                </div>
            </div>
        </Pagina>
    )
}