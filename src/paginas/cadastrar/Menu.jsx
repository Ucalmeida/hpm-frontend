import React, {useState} from 'react'
import {BotaoSalvar, Card, Input, Pagina} from "../../componentes";
import {acoes} from "../../json/acoes";
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";

const LOG = console.log
const CADASTRA_ACAO_FRONTEND = '/hpm/acao/frontend';


export default function Menu() {
    const [objeto, setObjeto] = useState({
        uri: '',
        isPublica: false,
        descricao: ''
    })
    function handleChange(e) {
        e.preventDefault()
        setObjeto({...objeto, [e.target.name]: e.target.value})
    }

    function encontraAcao() {
        const path = objeto.uri.split("/")
        let find = acoes.find(a => a.url === path[1]);
        let i = 2
        while (find !== undefined && find.acoes) {
            find = find.acoes.filter(a => a.url === path[i])
            i++
        }

        return find;
    }

    function salvar(e) {
        e.preventDefault()

        const acao = encontraAcao()
        if (!acao || acao.length === 0) {
            ExibirMensagem("A ação não foi encontrada.", MSG.ERRO)
            return
        }
        let dados = {
            uri: objeto.uri,
            publica: objeto.isPublica,
            descricao: objeto.descricao,
            dependencias: acao.dependencias,
            verbo: 'GET',
            front: true
        }
        xfetch(CADASTRA_ACAO_FRONTEND, dados, HttpVerbo.POST)
            .then(dados => {
                if (dados.status === 'OK') {
                    ExibirMensagem("Ação cadastrada com sucesso.", MSG.SUCESSO)
                }
            })
    }

    return (
        <Pagina titulo="Cadastrar Menu" subTitulo="Cadastrar novo item no menu para ser liberável">
            <Card titulo="Cadastrar menu">
                <div className="row">
                    <div className="col-lg-3">
                        <Input
                            label="URI"
                            name="uri"
                            onChange={handleChange}
                            value={objeto.uri}
                            legenda="Ex.: cadastrar/menu"/>
                    </div>
                    <div className="col-lg-6">
                        <Input
                            label="Descrição"
                            name="descricao"
                            onChange={handleChange}
                            value={objeto.descricao}/>
                    </div>
                    <div className="col-lg-3">
                        <label>Pública</label>
                        <select
                            className="form-control"
                            name="isPublica"
                            value={objeto.isPublica}
                            onChange={handleChange}>
                            <option value={false}>Não</option>
                            <option value={true}>Sim</option>
                        </select>
                        <small className="text-danger">
                            Caso seja pública, todos terão acesso, mesmo sem login.
                        </small>
                    </div>
                </div>
                <div className="row pull-right">
                    <BotaoSalvar onClick={salvar}/>
                </div>
            </Card>
        </Pagina>
    )
}