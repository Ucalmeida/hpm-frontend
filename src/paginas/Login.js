import React from "react";
import {Link, Redirect} from "react-router-dom";
<<<<<<< Updated upstream

import logoHPM from "../img/brasoes/brasao_hpm.png";
import {ExibirMensagem, HttpVerbo, xfetch} from "../util";
import {Botao, Icone} from "../componentes";
import PaginaSemLogin from "../componentes/pagina/PaginaSemLogin";
=======
import {xfetch} from "../util/Util";
import {HttpVerbo} from "../util/Constantes";
>>>>>>> Stashed changes

document.getElementById('root').classList = 'hold-transition login-page';

const log = console.log;

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            login: '',
            senha: '',
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
<<<<<<< Updated upstream
            .catch(e => this.setState({carregando: false}) & ExibirMensagem(e))
    }

    naoTenhoUsuario = () => {
        ExibirMensagem("Procure a administração da sua instituição de origem para realizar o seu cadastro.")
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
            <div className="login-page animated--fade-in">
                <div className="login-box">
                    <div className="card card-outline card-primary">
                        <div className="card-header text-center">
                            <b>PORTAL</b>
                            <span> HPM</span>
                        </div>
                        <div className="text-center">
                            {spiner}
                        </div>
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">Insira abaixo suas credenciais para entrar no módulo HPM</p>
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
                                <input type="button" onClick={this.enviar} className="btn btn-success" value="Entrar"/>
                            </div>

                            <div className="social-auth-links text-center mt-2 mb-3">
                            </div>
                            <p className="mb-1">
                               <Link to="/esqueciMinhaSenha">esqueci a senha</Link>
                            </p>
                            <p className="mb-0">
                                novo usuario
                            </p>
                        </div>
                    </div>
                </div>
            </div>
>>>>>>> Stashed changes
        );
    }
}

