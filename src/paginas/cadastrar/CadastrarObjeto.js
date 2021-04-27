import React from 'react'
import {xfetch} from "../../util/Util";
import {HttpVerbo, Tipo} from "../../util/Constantes";
import {BotaoSalvar} from "../../componentes/Botao";
import {ExibirMensagem} from "../../util";
import {Card, Input, Pagina, Spinner} from "../../componentes";


export class CadastrarObjeto extends React.Component {
    constructor() {
        super();
        this.state = {
            nome: '',
            atualizar: false,
            objetos: []
        }
    }

    enviar = (e) => {
        e.preventDefault()
        let objeto = {nome: this.state.nome}

        xfetch('/hpm/objeto', objeto, HttpVerbo.POST)
            .then(json => {
                if (json.status === "OK") {
                    ExibirMensagem('Objeto Cadastrado com Sucesso',Tipo.MSG.SUCESSO)
                    this.listarObjetos()
                } else {
                    ExibirMensagem(json.message, Tipo.MSG.ERRO)
                }
            })
    }

    listarObjetos = () => {
        this.setState({carregando: true})
        xfetch('/hpm/objeto', {}, HttpVerbo.GET)
            .then(resultado => resultado.json())
            .then(json => this.setState({objetos: json.resultado, carregando:false}))
            .catch(e => this.setState({carregando: false}))
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount() {
        this.listarObjetos()
    }

    render() {
        const {nome, carregando, objetos} = this.state
        let spinner = '';
        if (carregando) {
            spinner =
                <Spinner />
        }
        return (
            <Pagina>
                <div className="row animated--fade-in">
                    <div className="col-lg-4">
                        <Card>
                            <Input
                                type="text"
                                onChange={this.handleChange}
                                value={nome}
                                name="nome"
                                label="Nome Objeto"
                                placeholder="Nome Objeto"/>

                            <div className="align-items-end col-12">
                                <BotaoSalvar onClick={this.enviar}/>
                            </div>
                        </Card>
                    </div>
                    <div className="col-lg-4">
                        <Card titulo="Objetos cadastrados">
                            {spinner}
                            <ul className={"list-unstyled"}>
                                {objetos.map((v, k) => {
                                    return <li key={k}>{v.nome}</li>
                                })}
                            </ul>
                        </Card>
                    </div>
                </div>
            </Pagina>
        );
    }
}