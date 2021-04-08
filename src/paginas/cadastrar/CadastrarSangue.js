import React from 'react'
import Pagina from "../../componentes/pagina/Pagina";
import Card from "../../componentes/Card";
import Input from "../../componentes/Input";
import {HttpVerbo, xfetch} from "../../util/Util";
import ListarSangue from "../../componentes/ListarSangue";


export default class CadastrarSangue extends React.Component {
    constructor() {
        super();
        this.state = {
            nome: '',
            atualizar: false
        }
    }

    enviar = (e) => {
        e.preventDefault()
        let objeto = {nome: this.state.nome}

        xfetch('/hpm/sangue', objeto, HttpVerbo.POST)
            .then(json => {
                if (json.status === "OK") {
                    window.alert('Sangue cadastrado')
                } else {
                    window.alert("Algo errado aconteceu - " + json.message)
                }
            })
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {nome} = this.state
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
                            <ListarSangue />
                        </Card>
                    </div>
                    <div className="col-lg-4">
                    </div>
                </div>
            </Pagina>
        );
    }
}