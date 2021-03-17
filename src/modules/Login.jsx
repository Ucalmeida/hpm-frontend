import React from "react";

document.getElementById('root').classList = 'hold-transition login-page';

const Login = () => {
    return (
        <div className="login-box">
            <div className="card card-outline card-primary">
                <div className="card-header text-center">
                        <b>PORTAL</b>
                        <span> HPM</span>
                </div>
                <div className="card-body login-card-body">
                    <p className="login-box-msg">Insira abaixo suas credenciais para entrar no módulo HPM</p>
                    <form >
                        <div className="mb-3">
                            <div className="input-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Usuário"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="input-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Senha"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                        </div>
    
                    </form>
                    <div className="social-auth-links text-center mt-2 mb-3">
                    </div>
                    <p className="mb-1">
                        esqueci a senha
                    </p>
                    <p className="mb-0">
                        novo usuario
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;

