import React, {useState} from "react";
import {Botao, Card, Pagina, Select, Spinner} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";

const LOG = console.log

export function VincularSetorFuncao() {

    const [objeto, setObjeto] = useState({
        idSetor: -1,
        idFuncao: null,
        funcoes: [],
        carregandoFuncoes: false,
        carregandoVincular: false
    })

    function carregarFuncoesPorSetor() {
        setObjeto({...objeto, carregandoFuncoes: true, funcoes: []})
        const {idSetor} = objeto
        xfetch("/hpm/setorFuncao/" + idSetor, {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(dados => {
                setObjeto({...objeto, funcoes: dados.resultado, carregandoFuncoes: false})
            })
    }

    function selecionarSetor(e) {
        e.preventDefault()
        let idSetor = e.target.value
        objeto.idSetor = e.target.value
        carregarFuncoesPorSetor();
    }

    function selecionarFuncao(e) {
        e.preventDefault()
        const idFuncao = e.target.value
        setObjeto({...objeto, idFuncao: idFuncao})
    }

    function vincular(e) {
        e.preventDefault()
        const dados = {
            idSetor: objeto.idSetor,
            idFuncao: objeto.idFuncao
        }
        setObjeto({...objeto, carregandoVincular: true})
        xfetch("/hpm/setorFuncao/vincular", dados, HttpVerbo.POST)
            .then(dados => {
                if (dados.status === 500) {
                    ExibirMensagem(dados.message, MSG.ERRO)
                    setObjeto({...objeto, carregandoVincular: false})
                    return
                }
                setObjeto({...objeto, carregandoVincular: false})
                carregarFuncoesPorSetor()
            })
    }

    let spinner = objeto.carregandoFuncoes ? <Spinner/> : ''
    let spinnerVincular = objeto.carregandoVincular ? <Spinner/> : ''
    let funcoes = objeto.funcoes
    return (
        <Pagina titulo="Vincular setor-função">
            <div className="row">
                <div className="col-lg-6">
                    <Card titulo="Vincular">
                        <div className="col-lg-12">
                            {spinnerVincular}
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <Select
                                    url="/hpm/setor/opcoes"
                                    funcao={selecionarSetor}
                                    nome="setor"
                                    label="Setor"/>
                            </div>
                            <div className="col-lg-6">

                                <Select
                                    url="/hpm/funcao/opcoes"
                                    funcao={selecionarFuncao}
                                    nome="funcao"
                                    label="Função"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 text-lg-right mt-2 mb-2">
                                <Botao className="" cor="success" onClick={vincular}>
                                    Vincular
                                </Botao>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-lg-6">
                    <Card titulo="Funções no setor selecionado">
                        {spinner}
                        <ul className={"list-unstyled"} style={{columns: 3}}>
                            {funcoes.map((v, k) => {
                               return <li className="flex-fill" key={k}> {v.nome}</li>
                            })}
                        </ul>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}