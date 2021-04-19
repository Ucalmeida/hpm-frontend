import React from "react";
import {NavLink, Link} from "react-router-dom";

import logoHPM from "../../img/brasoes/brasao_hpm.png";

export default class MenuLateral extends React.Component {
    render() {
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4" >
                <Link to="/" className="brand-link border-bottom-verdepetroleo">
                    <img
                        src={logoHPM}
                        alt="Brasão HPM"
                        className="brand-image img-circle elevation-3"
                        height="33px"
                        style={{opacity: '.8'}}
                    />
                    <span className="brand-text font-weight-bold">Portal HPM</span>
                </Link>
                <div className="sidebar">
                    <nav className="mt-2">
                        <ul
                            className="nav nav-pills nav-sidebar flex-column nav-child-indent"
                            data-widget="treeview"
                            role="menu"
                            data-accordion="false"
                        >
                            <li className="nav-item">
                                <NavLink to="/alterarSenha" exact className="nav-link">
                                    <i className="nav-icon fas fa-lock" />
                                    <p>Alterar Senha</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-plus"></i>
                                    <p>
                                        Cadastrar
                                        <i className="fas fa-angle-down right"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <NavLink to="/cadastrar/objeto" exact className="nav-link">
                                            <i className="nav-icon fas fa-plus" />
                                            <p>Cadatrar Objeto</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/cadastrar/sangue" exact className="nav-link">
                                            <i className="nav-icon fas fa-plus" />
                                            <p>Cadatrar Sangue</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/cadastrar/pessoa" exact className="nav-link">
                                            <i className="nav-icon fas fa-plus" />
                                            <p>Cadastrar Pessoa</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/cadastrar/predio" exact className="nav-link">
                                            <i className="nav-icon fas fa-plus" />
                                            <p>Cadastrar Prédio</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/cadastrar/especialidade" exact className="nav-link">
                                    <i className="nav-icon fas fa-plus" />
                                    <p>Cadatrar Especialidade</p>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    };
};