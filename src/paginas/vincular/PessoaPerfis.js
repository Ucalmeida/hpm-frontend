import React, {useState} from 'react'
import {Autocompletar, Botao, BotaoExcluir, Card, Pagina, Select, Tabela} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";
import {acoes} from "../../json/acoes";
import {components} from "react-select";


const LOG = console.log
export default function PessoaPerfis() {
    const [objeto, setObjeto] = useState({
        busca: '',
        carregandoPerfis: false,
        carregandoAcoes: false,
        carregandoAcoesPerfis: false,
        perfis: [],
        perfil: undefined,
        pessoa: undefined,
        listarPessoasPerfil: []
    })

    const Placeholder = props => {
        return <components.Placeholder {...props}> Selecione ação </components.Placeholder>;
    };

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
        const idPerfil = e.value;
        objeto.perfil = idPerfil;
    }

    const selecionarPessoa = (e) => {
        let idpessoa = document.getElementById('idpessoa').value;
        console.log("Pessoa em Selecionar:", idpessoa);
        objeto.pessoa = idpessoa;
    }

    function vincular(e) {
        e.preventDefault()
        const idPessoa = objeto.pessoa
        const idPerfil = objeto.perfil

        console.log("Pessoa:", idPessoa);
        console.log("Perfil:", idPerfil);


        if (!idPessoa || !idPerfil) {
            ExibirMensagem("Um perfil e/ou uma pessoa precisa ser informadas", MSG.ERRO)
            return
        }

        let dados = {
            idPessoa: idPessoa,
            idPerfil: idPerfil
        }

        xfetch("/hpm/pessoa-perfil/cadastrar", dados, HttpVerbo.POST)
            .then(res => {
                if (typeof res !== "undefined" ? res.status === "OK" : false) {
                    ExibirMensagem("Perfil atribuído com sucesso", MSG.SUCESSO)
                    setObjeto({...objeto, listarPessoasPerfil: res.resultado})
                }
            })

    }

    const colunas = [
        { text: "Id" },
        { text: "Nome" },
        { text: "Ações" }
    ];

    const dados = () => {
        return (
            objeto.listarPessoasPerfil.map((pes, index) => {
                return ({
                    'id': pes.id,
                    'Nome': pes.nome,
                    'acoes': <BotaoExcluir tamanho={BOTAO.TAMANHO.PEQUENO} />
                })
            })
        )
    }

    return (
        <Pagina titulo="Vincular perfil ação">
            <Card titulo="Vincular">
                <div className="row">
                    <div className="col-lg-4">
                        <label>Escolha um Perfil:</label>
                        <Select
                            placeholder="Selecione o perfil"
                            funcao={selecionarPerfil}
                            url="/hpm/perfil/opcoes"/>
                    </div>
                    <div className="col-lg-6">
                        <Autocompletar
                            name="pessoa"
                            url="/hpm/pessoa/"
                            label="Digite os Dados:"
                            placeholder="Nome ou CPF aqui"
                            tamanho={6}
                            retorno={selecionarPessoa} />
                    </div>

                    <Botao className="col-lg-2" cor="success" icone={"fas fa-retweet"} onClick={vincular}>
                        Vincular
                    </Botao>
                </div>

                <div className="col-lg-12 mt-2 ">
                    <div className="col-lg-6 form-group">
                    </div>
                    <Tabela colunas={colunas} dados={dados()} pageSize={5} />
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

        
        for (let i = 2; find !== undefined && find.acoes; i++) {
            find = find.acoes.filter(a => a.url === path[i])
        }
        return find[0];
    }
}