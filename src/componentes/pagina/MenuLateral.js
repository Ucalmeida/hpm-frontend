import React from "react";
import {NavLink, Link} from "react-router-dom";

import logoHPM from "../../img/brasoes/brasao_hpm.png";
import {Logado} from "../../util/Util";
import {Icone} from "../Icone";

export default class MenuLateral extends React.Component {
    render() {
        if (!Logado()) return "";
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
                                    <Icone icone={"fas fa-plus-circle"} className={"nav-icon"} margem={false}/>
                                    <p>
                                        Cadastrar
                                        <Icone icone={"fas fa-angle-down"} className={"right"} margem={true}/>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <NavLink to="/cadastrar/objeto" exact className="nav-link">
                                            <Icone icone={"fas fa-cubes"} className={"nav-icon"} margem={false}/>
                                            <p>Objeto</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/cadastrar/sangue" exact className="nav-link">
                                            <Icone icone={"fas fa-burn"} className={"nav-icon"} margem={false}/>
                                            <p>Sangue</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/cadastrar/pessoa" exact className="nav-link">
                                            <Icone icone={"fas fa-user-plus"} className={"nav-icon"} margem={false}/>
                                            <p>Pessoa</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/cadastrar/predio" exact className="nav-link">
                                            <Icone icone={"fas fa-clinic-medical"} className={"nav-icon"} margem={false}/>
                                            <p>Prédio</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/cadastrar/especialidade" exact className="nav-link">
                                            <Icone icone={"fas fa-user-nurse"} className={"nav-icon"} margem={false}/>
                                            <p>Cadastrar Especialidade</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/cadastrar/tipo" exact className="nav-link">
                                            <Icone icone={"fas fa-user-nurse"} className={"nav-icon"} margem={false}/>
                                            <p>Cadastrar Tipo</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/cadastrar/setor" exact className="nav-link">
                                            <Icone icone="fas fa-plus" className={"nav-icon"} margem={false}/>
                                            <p>Cadastrar Setor</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/cadastrar/funcao" exact className="nav-link">
                                            <Icone icone="fas fa-plus" className={"nav-icon"} margem={false}/>
                                            <p>Cadastrar Funcao</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    };
};