import React from 'react'
import Pagina from "../../componentes/pagina/Pagina";
import Card from "../../componentes/Card";
import Input from "../../componentes/form/Input";
import {HttpVerbo, xfetch} from "../../util/Util";


export default class CadastrarObjeto extends React.Component {
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
                    window.alert('Objeto cadastrado')
                    this.listarObjetos()
                } else {
                    window.alert("Algo errado aconteceu - " + json.message)
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
                <div className="fa-2x">
                    <i className="fas fa-spinner fa-spin"></i>
                </div>;
        }
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
                                label="Nome Objeto"
                                placeholder="Nome Objeto"/>

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
                        <Card titulo="Objetos cadastrados">
                            {spinner}
                            <ul>
                                {objetos.map((v, k) => {
                                    return <li key={k}>{v.nome}</li>
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