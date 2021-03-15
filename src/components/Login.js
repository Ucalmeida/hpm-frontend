import { Component } from "react";
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
                    <p className="login-box-msg">LOGIN</p>
                    <form >
                        <div className="mb-3">
                            <div className="input-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                   email
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
                                    placeholder="Password"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className="row">
                            <div className="col-8">
                                <div className="icheck-primary">
                                    <input type="checkbox" id="remember" />
                                    <label htmlFor="remember">
                                        me lembre
                                    </label>
                                </div>
                            </div>
                            <div className="col-4">
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

