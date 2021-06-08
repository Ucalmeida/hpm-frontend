import React, {useState} from "react";
import {Botao, Card, Pagina, Select, Spinner} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, ICONE, MSG} from "../../util/Constantes";

const LOG = console.log

export function VincularSubSetor() {

    const [objeto, setObjeto] = useState({
        idSetor: -1,
        idSubSetor: null,
        subsetores: [],
        carregandoSubSetor: false,
        carregandoVincular: false
    })

    function carregarSubsetoresPorSetor() {
        setObjeto({...objeto, carregandoSubSetor: true, subsetores: []})
        const {idSetor} = objeto
        xfetch("/hpm/setor/subsetores/" + idSetor, {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(dados => {
                setObjeto({...objeto, subsetores: dados.resultado, carregandoSubSetor: false})
            })
    }

    function selecionarSetor(e) {
        let idSetor = e.value
        objeto.idSetor = e.value
        carregarSubsetoresPorSetor();
    }

    function selecionarSubSetor(e) {
        const idSubsSetor = e.value
        setObjeto({...objeto, idSubSetor: idSubsSetor})
    }

    function vincular(e) {
        const dados = {
            idPai: objeto.idSetor,
            idFilho: objeto.idSubSetor
        }
        setObjeto({...objeto, carregandoVincular: true})
        xfetch("/hpm/setor/vincular", dados, HttpVerbo.POST)
            .then(dados => {
                if (dados.status === 500) {
                    ExibirMensagem(dados.message, MSG.ERRO)
                    setObjeto({...objeto, carregandoVincular: false})
                    return
                }
                setObjeto({...objeto, carregandoVincular: false})
                carregarSubsetoresPorSetor()
            })
    }

    let spinner = objeto.carregandoSubSetor ? <Spinner/> : ''
    let spinnerVincular = objeto.carregandoVincular ? <Spinner/> : ''
    let subsetores = objeto.subsetores
    return (
        <Pagina titulo="Vincular Setor-Subsetor">
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
                                    url="/hpm/setor/opcoes"
                                    funcao={selecionarSubSetor}
                                    nome="subSetor"
                                    label="SubSetor"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 text-lg-right mt-2 mb-2">
                                <Botao cor={BOTAO.COR.SUCESSO} icone={"fas fa-exchange-alt"} onClick={vincular}>
                                    Vincular
                                </Botao>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-lg-6">
                    <Card titulo="Subsetores do setor selecionado">
                        {spinner}
                        <ul className={"list-unstyled"} style={{columns: 3}}>
                            {subsetores.map((v, k) => {
                               return <li className="flex-fill" key={k}> {v.nome}</li>
                            })}
                        </ul>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}