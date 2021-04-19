import React from 'react'
import Pagina from "../../componentes/pagina/Pagina";
import Card from "../../componentes/Card";
import {ExibirMensagem, xfetch} from "../../util/Util";
import Input from "../../componentes/form/Input";
import Spinner from "../../componentes/Spinner";
import {HttpVerbo, Tipo} from "../../util/Constantes";


export default class CadastrarSangue extends React.Component {
    constructor() {
        super();
        this.state = {
            nome: '',
            carregando: false,
            objetos: []
        }
    }

    carregarLista = () => {
        this.setState({carregando: true})
        xfetch('/hpm/sangue/opcoes', {}, HttpVerbo.GET)
            .then(resultado => resultado.json())
            .then(json => this.setState({objetos: json.resultado, carregando: false}))
            .catch(e => this.setState({carregando: false}))
    }

    enviar = (e) => {
        e.preventDefault()
        let objeto = {nome: this.state.nome}

        xfetch('/hpm/sangue', objeto, HttpVerbo.POST)
            .then(json => {
                if (json.status === "OK") {
                    ExibirMensagem('Sangue cadastrado',Tipo.MSG.SUCESSO)
                    this.carregarLista()
                } else {
                    ExibirMensagem(json.message, Tipo.MSG.ERRO)
                }
            })
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount() {
        this.carregarLista()
    }

    render() {
        const {nome, carregando, objetos} = this.state
        let spinner = '';
        if (carregando) {
            spinner = <Spinner></Spinner>
        };
        return (
            <Pagina>
                <div className="row animated--fade-in">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <Card>
                            <Input
                                type="text"
                                onChange={this.handleChange}
                                value={nome}
                                name="nome"
                                label="Tipo Sangue"
                                placeholder="Tipo Sangue"/>

                            <div className="align-items-end col-12">
                                <button className="btn btn-success pull-right" onClick={this.enviar}> Cadastrar </button>
                            </div>
                        </Card>
                    </div>
                    <div className="col-12">
                        <hr className="col-12"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                    </div>
                    <div className="col-lg-4">
                        <Card titulo="Sangue cadastrados">
                            {spinner}
                            <ul>
                                {objetos.map((v, k) => {
                                    return <li key={k}> {v.texto}</li>
                                })}
                            </ul>
                        </Card>
                    </div>
                    <div className="col-lg-4">
                    </div>
                </div>
            </Pagina>
        );
    }
}