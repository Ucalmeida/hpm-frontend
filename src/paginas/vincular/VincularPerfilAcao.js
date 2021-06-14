import React, {useEffect, useState} from 'react'
import {Botao, Card, Pagina, Select} from "../../componentes";
import {xfetch} from "../../util";
import {HttpVerbo} from "../../util/Constantes";


export function VincularPerfilAcao() {
    const [objeto, setObjeto] = useState({
        busca: '',
        carregandoPerfis: false,
        carregandoAcoes: false,
        carregandoAcoesPerfis: false,
        perfis: [],
        listaAcoes: [],
        listaAcoesDoPerfil: []
    })

    useEffect(() => {
        carregarAcoes();
    }, [])

    function buscaHandle(e) {
        setObjeto({...objeto, busca: e.value})
    }

    // function carregarPerfis() {
    //     setObjeto({...objeto, carregandoPerfis: true, perfis: []})
    //     xfetch('/hpm/perfil', {}, HttpVerbo.GET)
    //         .then(res => res.json())
    //         .then(dados => {
    //             if (dados.status === "OK") {
    //                 setObjeto({...objeto, perfis: dados.resultado})
    //             }
    //         })
    //         .finally((e) => setObjeto({...objeto, carregandoPerfis: false}))
    //
    // }


    const carregarAcoes = (e) => {
        setObjeto({...objeto, carregandoAcoes: true, acoes: []})
        xfetch('/hpm/acao', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(dados => {
                if (dados.status == "OK") {
                    setObjeto({...objeto, listaAcoes: dados.resultado, carregandoAcoes: false})
                }
            })
    }
    console.log("render")

    function resolveCor(verbo) {
        if (verbo === "GET") {
            return 'text-success'
        }

        if (verbo === "POST") {
            return 'text-danger'
        }

        if (verbo === "PUT") {
            return 'text-primary'
        }
        return "";
    }

    function selecionarPerfil(e) {
        const idPerfil = e.value
        xfetch('/hpm/perfil/acoes/'+idPerfil, {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(dados => {
                if (dados.status === "OK") {
                    setObjeto({...objeto, listaAcoesDoPerfil: dados.resultado, carregandoAcoesPerfis: false})
                }
            })
    }

    const acoesPerfil = objeto.listaAcoesDoPerfil

    function toggleAcao(e) {
        e.preventDefault()
        console.log(e.target.parentElement.id)
    }

    return (
        <Pagina titulo="Vincular perfil ação">
            <Card titulo="Vincular">
                <div className="row">
                    <div className="col-lg-4">
                        <Select
                            placeholder="Perfil"
                            funcao={selecionarPerfil}
                            url="/hpm/perfil/opcoes"
                            label="Perfil" />
                    </div>
                    <div className="col-lg-6">
                        <Select
                            placeholder="Perfil"
                            funcao={selecionarPerfil}
                            url="/hpm/perfil/opcoes"
                            label="Perfil" />
                    </div>

                    <Botao className="col-lg-2" cor="success">
                        Vincular
                    </Botao>
                </div>

                <div className="col-lg-12 mt-2 ">
                    <div className="col-lg-6 form-group">
                        <input
                            className="pull-right form-control col-lg-2"
                            value={objeto.busca}
                            onChange={buscaHandle}
                            placeholder="Busca"/>
                    </div>
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <th>Descrição</th>
                            <th>Verbo</th>
                            <th>URI</th>
                            <th>Publica</th>
                            <th>Ações</th>
                        </thead>
                        <tbody>
                            {objeto.listaAcoes.map((v, k) => {
                                let classe = ''
                                if (acoesPerfil.filter(a => a.link === v.link).length) {
                                    classe = 'bg-primary';
                                }
                                return (
                                    <tr onClick={toggleAcao} id={v.id} key={v.id} className={classe}>
                                        <td> {v.descricao} </td>
                                        <td className={resolveCor(v.verbo)}> {v.verbo} </td>
                                        <td> {v.link} </td>
                                        <td > {v.publica ? 'SIM' : 'NÃO'} </td>
                                        <td></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </Pagina>
    );
}