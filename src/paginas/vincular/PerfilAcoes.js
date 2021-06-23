import React, {useEffect, useState} from 'react'
import {Botao, BotaoExcluir, Card, Pagina, Select, Tabela} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";
import {acoes} from "../../componentes/pagina/acoes";
import ReactSelect, {components} from "react-select";


const LOG = console.log
export function PerfilAcoes() {
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
    const colunas = [
        { text: "Descrição" ,},
        { text: "Verbo" },
        { text: "URI" },
        { text: "Pública" },
        { text: "Ações" }
    ];

    const dados = () => {
        return (
            objeto.listaAcoesPerfil.map((acao, index) => {
                return ({
                    'id': acao.id,
                    'descricao': acao.descricao,
                    'verbo': acao.verbo,
                    'uri': acao.link,
                    'publica': acao.publica ? "SIM" : "NÃO",
                    'acoes': <BotaoExcluir tamanho={BOTAO.TAMANHO.PEQUENO} />
                })
            })
        )
    }

    const acoesBackend = getAcoes();
    return (
        <Pagina titulo="Vincular perfil ação">
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

                    <Botao className="col-lg-2" cor="success" icone={"fas fa-retweet"} onClick={vincular}>
                        Vincular
                    </Botao>
                </div>

                <div className="col-lg-12 mt-2 ">
                    <div className="col-lg-6 form-group">
                    </div>
                    <Tabela colunas={colunas} dados={dados()} />
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