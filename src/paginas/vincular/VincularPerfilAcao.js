import React, {useEffect, useState} from 'react'
import {Botao, Card, Pagina, Select} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";
import {acoes} from "../../componentes/pagina/acoes";
import ReactSelect, {components} from "react-select";
import Tabela from "../../componentes/tabela/Tabela";


const LOG = console.log
export function VincularPerfilAcao() {
    const [objeto, setObjeto] = useState({
        busca: '',
        carregandoPerfis: false,
        carregandoAcoes: false,
        carregandoAcoesPerfis: false,
        perfis: [],
        perfil: undefined,
        acao: undefined,
        listaAcoes: [],
        listaAcoesPerfil: []
    })

    const Placeholder = props => {
        return <components.Placeholder {...props}> Selecione ação </components.Placeholder>;
    };

    useEffect(() => {
        carregarAcoes();
    }, [])

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
        objeto.perfil = idPerfil
        xfetch('/hpm/perfil/acoes/'+idPerfil, {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(dados => {
                if (dados.status === "OK") {
                    setObjeto({...objeto, listaAcoesPerfil: dados.resultado, carregandoAcoesPerfis: false})
                }
            })
    }

    function vincular(e) {
        e.preventDefault()
        const idAcao = objeto.acao
        const idPerfil = objeto.perfil

        if (!idAcao || !idPerfil) {
            ExibirMensagem("Um perfil e/ou uma ação precisa ser informadas", MSG.ERRO)
            return
        }

        let dados = {
            idAcao: idAcao,
            idPerfil: idPerfil,
            dependencias: []
        }
        let acaoEscolhida = objeto.listaAcoes.find(a => a.id == idAcao);
        if (acaoEscolhida.isFrontend) {

            let acaoFrontend = encontraAcao(acaoEscolhida.link);
            if (acaoFrontend.dependencias) {
                dados.dependencias = acaoFrontend.dependencias
            }
        }

        xfetch("/hpm/perfil/acao/vincular", dados, HttpVerbo.POST)
            .then(res => {
                if (res.status === "OK") {
                    ExibirMensagem("Ação cadastrada com sucesso", MSG.SUCESSO)
                    setObjeto({...objeto, listaAcoesPerfil: res.resultado})
                }
            })

    }

    function selecionarAcao(a) {
        objeto.acao = a.value;
    }

    const acoesBackend = getAcoes();
    return (
        <Pagina titulo="Vincular perfil ação">
            <Card>
                <Tabela colunas={""} dados={""} />
            </Card>
            <Card titulo="Vincular">
                <div className="row">
                    <div className="col-lg-4">
                        <Select
                            placeholder="Selecione o perfil"
                            funcao={selecionarPerfil}
                            url="/hpm/perfil/opcoes"/>
                    </div>
                    <div className="col-lg-6">
                        <ReactSelect
                            options={acoesBackend}
                            name="acao"
                            onChange={selecionarAcao}
                            components={{Placeholder}}/>
                    </div>

                    <Botao className="col-lg-2" cor="success" onClick={vincular}>
                        Vincular
                    </Botao>
                </div>

                <div className="col-lg-12 mt-2 ">
                    <div className="col-lg-6 form-group">
                    </div>
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Verbo</th>
                                <th>URI</th>
                                <th>Publica</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {objeto.listaAcoesPerfil.map((v, k) => {
                                return (
                                    <tr id={v.id} key={v.id}>
                                        <td> {v.descricao} </td>
                                        <td className={resolveCor(v.verbo)}> {v.verbo} </td>
                                        <td> {v.link} </td>
                                        <td> {v.publica ? 'SIM' : 'NÃO'} </td>
                                        <td>
                                            <Botao cor="danger" icone="fas fa-trash"/>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </Pagina>
    );

    function getAcoes() {
        return objeto.listaAcoes.map((a) => {
            const local = a.isFrontend ? 'FRONTEND' : 'BACKEND'
            let label = local + ' | ' + a.verbo + ' - ' + a.link
            return {value: a.id, label: label, key: a.id}
        });
    }


    function encontraAcao(link) {
        const path = link.split("/")

        let find = acoes.find(a => a.url === path[1]);

        let i = 2
        while (find !== undefined && find.acoes) {
            find = find.acoes.filter(a => a.url === path[i])
            i++
        }
        return find[0];
    }
}