import React, { useState } from 'react';
import { Autocompletar, Botao, BotaoExcluir, Card, Pagina, Select, Tabela } from "../../componentes";
import { acoes } from "../../json/acoes";
import { ExibirMensagem, xfetch } from "../../util";
import { BOTAO, HttpVerbo, MSG } from "../../util/Constantes";

export default function PessoaPerfis() {
    const [objeto, setObjeto] = useState({
        busca: '',
        carregandoPerfis: false,
        carregandoAcoes: false,
        carregandoAcoesPerfis: false,
        idPerfil: undefined,
        idPessoa: undefined,
        perfis: [],
        listarPessoasPerfil: []
    })
    
    function selecionarPerfil(e) {
        const idPerfil = e.value;
        setObjeto({...objeto, idPerfil: idPerfil});
    }

    const selecionarPessoa = (event) => {
        const idpessoa = event;
        setObjeto({...objeto, idPessoa: idpessoa});
    }
    console.log("Pessoa em Objeto:", objeto);

    function vincular(e) {
        e.preventDefault();
        console.log("Pessoa:", objeto.idPessoa);
        console.log("Perfil:", objeto.idPerfil);


        if (!objeto.idPessoa || !objeto.idPerfil) {
            ExibirMensagem("Um perfil e/ou uma pessoa precisa ser informadas", MSG.ERRO)
            return
        }

        const dados = {
            idPessoa: objeto.idPessoa,
            idPerfil: objeto.idPerfil
        }

        xfetch("/hpm/pessoa-perfil/cadastrar", dados, HttpVerbo.POST)
            .then(res => {
                if (typeof res !== "undefined" ? res.status === "OK" : false) {
                    ExibirMensagem("Perfil atribuído com sucesso", MSG.SUCESSO)
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
                            retorno={(e) => selecionarPessoa(e)} />
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
    )
}