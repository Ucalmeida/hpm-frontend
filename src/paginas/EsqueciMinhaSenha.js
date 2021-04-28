import React from "react";
import {Link, Redirect} from "react-router-dom";
import {HttpVerbo, Tipo} from "../util/Constantes";
import {Botao, BotaoEnviar, Icone, Spinner} from "../componentes";
import {ExibirMensagem, xfetch} from "../util";
import PaginaSemLogin from "../componentes/pagina/PaginaSemLogin";

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
            <PaginaSemLogin titulo={"Esqueceu sua senha?"}>
                    <p className="login-box-msg">
                        Por favor informe abaixo o seu cpf para enviarmos um link com as instruções de redefinição de senha para seu email.
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
                        <BotaoEnviar onClick={this.enviar} />
                    </div>
                    <p className="mb-1">
                        <Link to={"/"}><Icone icone={Tipo.ICONE.VOLTAR}/>Voltar ao login</Link>
                    </p>
            </PaginaSemLogin>
        );
    }
}