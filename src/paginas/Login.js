import React, {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";

import logoHPM from "../img/brasoes/brasao_hpm.png";
import {ExibirMensagem, xfetch} from "../util";
import {Botao, Icone} from "../componentes";
import PaginaSemLogin from "../componentes/pagina/PaginaSemLogin";
import {HttpVerbo, MSG} from "../util/Constantes";

document.getElementById('body').classList.remove('hold-transition','sidebar-mini','layout-fixed');
document.getElementById('body').classList.add('login-page');

const log = console.log;

const Login = () => {
    const [user, setUser] = useState({
        login: '',
        senha: '',
        logado: false,
        carregando: false
    })

    useEffect(() => {
        jaLogado();
    }, [])

    const handleLogin = (e) => {
        e.preventDefault();
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSenha = (e) => {
        e.preventDefault();
        setUser({...user, senha: e.target.value})
    }

    const jaLogado = () => {

    }

    const enviar = (e) => {
        e.preventDefault()
        setUser({...user, carregando: true})
        xfetch('/login', user, HttpVerbo.POST)
            .then(dados => {
                setUser({...user, carregando: false});
                if (dados.message) {
                    log(dados);
                    ExibirMensagem('Usuário e/ou senha inválidos',MSG.ERRO)
                } else {
                    localStorage.setItem('id', dados.id);
                    localStorage.setItem('usuario', dados.usuario);
                    localStorage.setItem('login', dados.login);
                    localStorage.setItem('token', dados.token);
                    localStorage.setItem('perfis', dados.perfis)
                    setUser({...user, logado: true})
                    window.location.reload();
                }
            })
            .catch(e => console.log(e))
    }

    const naoTenhoUsuario = () => {
        ExibirMensagem("Procure a administração da sua instituição de origem para realizar o seu cadastro.")
    }

    const {login, senha, logado, carregando} = user;

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
                        type="text"
                        className="form-control"
                        name="login"
                        value={login}
                        onChange={handleLogin}
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
                        className="form-control"
                        name="senha"
                        value={senha}
                        onChange={handleSenha}
                        placeholder="Senha"
                    />
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <span className="fas fa-lock"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 text-center">
                <Botao icone={'fas fa-sign-in-alt'} onClick={enviar}> Acessar </Botao>
            </div>

            <div className="social-auth-links text-center mt-2 mb-3">
            </div>
            <p className="mb-1">
                <Link to="/esqueciMinhaSenha"><Icone icone={"fas fa-unlock-alt"}/> Esqueci minha senha</Link>
            </p>
            <p className="mb-0">
                <Link to="#" onClick={naoTenhoUsuario}> <Icone icone={"far fa-question-circle"}/> Não tenho usuário </Link>
            </p>
        </PaginaSemLogin>
    );
}

export default Login;