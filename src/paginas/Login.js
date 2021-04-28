import React from "react";
import {Link, Redirect} from "react-router-dom";

import logoHPM from "../img/brasoes/brasao_hpm.png";
import PaginaSemLogin from "../componentes/pagina/PaginaSemLogin";
import {ExibirMensagem, HttpVerbo, Tipo, xfetch} from "../util";
import {Botao, BotaoEnviar, Icone} from "../componentes";

document.getElementById('root').classList = 'login-page';

const log = console.log;

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            login: '04856149520',
            senha: 'didijudoca',
            logado: false,
            carregando: false
        }
    }

    componentDidMount() {
        this.jaLogado();
    }

    handle = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

    jaLogado() {

    }

    enviar = (e) => {
        e.preventDefault()
        this.setState({carregando: true})
        xfetch('/login', this.state, HttpVerbo.POST)
            .then(dados => {
                this.setState({carregando: false});
                if (dados.message) {
                    log(dados);
                    window.alert('Login e/ou senha inválidos')
                } else {
                    localStorage.setItem('usuario', dados.usuario)
                    localStorage.setItem('token', dados.token);
                    this.setState({logado: true})
                    window.location.reload();
                }
            })
            .catch(e => this.setState({carregando: false}) & ExibirMensagem(e))
    }

    naoTenhoUsuario = () => {
        ExibirMensagem("Procure a administração da sua instituição de origem para realizar o seu cadastro.")
    }

    render() {
        const {login, senha, logado, carregando} = this.state
        if (logado || localStorage.getItem('token')) {
            return <Redirect to={'/principal'}/>
        }
        let spiner = '';
        if (carregando) {
            spiner =
                <div className="fa-3x">
                    <i className="fas fa-spinner fa-spin"></i>
                </div>
        }

        return (
          <PaginaSemLogin titulo="Insira abaixo suas credenciais para entrar no módulo HPM" img={logoHPM}>
              <div className="mb-3">
                  <div className="input-group">
                      <input
                        type="email"
                        className="form-control"
                        name="login"
                        value={login}
                        onChange={this.handle}
                        placeholder="Usuário"
                      />
                      <div className="input-group-append">
                          <div className="input-group-text">
                              <span className="fas fa-envelope"/>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="mb-3">
                  <div className="input-group">
                      <input
                        type="password"
                        name="senha"
                        className="form-control"
                        placeholder="Senha"
                        onChange={this.handle}
                        value={senha}
                      />
                      <div className="input-group-append">
                          <div className="input-group-text">
                              <span className="fas fa-lock"/>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-12 text-center">
                  <Botao icone={'fas fa-sign-in-alt'} onClick={this.enviar}> Acessar </Botao>
              </div>

              <div className="social-auth-links text-center mt-2 mb-3">
              </div>
              <p className="mb-1">
                  <Link to ="/esqueciMinhaSenha"><Icone icone={"fas fa-unlock-alt"}/> Esqueci minha senha</Link>
              </p>
              <p className="mb-0">
                  <Link onClick={this.naoTenhoUsuario}> <Icone icone={"far fa-question-circle"}/> Não tenho usuário </Link>
              </p>
          </PaginaSemLogin>
        );
    }
}

