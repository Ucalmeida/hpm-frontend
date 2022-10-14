import React from "react";
import {Link} from "react-router-dom";
import {ExibirMensagem, xfetch} from "../util";
import {Spinner} from "../componentes";
import {HttpVerbo} from "../util/Constantes";

export default class EsqueciMinhaSenha extends React.Component {

    constructor() {
        super();
        this.state = {
            cpf: "",
            carregando: false
        }

        this.onChange = (evento) => {
            evento.preventDefault();
            this.setState({cpf: evento.target.value})
        }
    }



    enviar = (evento) => {
        evento.preventDefault()
        this.setState({carregando: true})
        xfetch('/hpm/redefinir/esqueciMinhaSenha', this.state, HttpVerbo.POST)
            .then(json => {
                if (json.status === 'OK') {
                    ExibirMensagem(`Um email com um link para a redefinição da senha, foi enviado para: ${json.resultado.join(',')}`)
                    this.setState({cpf: ''})
                }
                this.setState({carregando: false})
            })
    }

    render() {
        const {carregando} = this.state;
        let spinner = ''
        if (carregando)
            spinner = <Spinner />
        return (
            <div className="login-page animated--fade-in">
                <div className="login-box">
                    <div className="card card-outline card-primary">
                        <div className="card-header text-center">
                            <b>PORTAL</b>
                            <span> HPM</span>
                        </div>
                        <div className="text-center">

                        </div>
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">
                                Esqueceu sua senha? <br/> Por favor informe abaixo o seu cpf para enviarmos um link com as instruções de redefinição de senha para seu email.
                            </p>
                            {spinner}
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="cpf"
                                    value={this.state.cpf}
                                    onChange={this.onChange}
                                    placeholder="CPF"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col-12 text-center">
                                <input type="button" onClick={this.enviar} className="btn btn-success" value="Enviar"/>
                            </div>
                            <p className="mb-1">
                              <Link to={"/"}>voltar ao login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}