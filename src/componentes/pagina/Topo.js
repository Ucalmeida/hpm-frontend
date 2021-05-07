import React from "react";
import {Link} from "react-router-dom";

import fotoUsuario from "../../img/icones/svg/solid/user-solid.svg"
import {Logado} from "../../util";
import {BOTAO} from "../../util/Constantes";
import {Botao} from "../Botao";

export default class Topo extends React.Component {
    constructor(toggleMenuSidebar) {
        super(toggleMenuSidebar);
        this.toggleMenuSidebar = toggleMenuSidebar

        let token = localStorage.getItem('token');
        let usuario = localStorage.getItem('usuario');
        this.tokenValido = false
        this.state = {
            usuario: usuario,
            token: token
        }
    }

    sair = (e) => {
        e.preventDefault();
        localStorage.clear();
        this.setState({usuario: ''});
        window.location.reload();
    }

    render() {
        console.log(Logado)
        if (!Logado) return "";
        const {usuario, token} = this.state
        return (
            <nav className="main-header navbar navbar-expand navbar-white navbar-light" >
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button
                            // onClick={this.toggleMenuSidebar}
                            type="button"
                            className="nav-link"
                            data-widget="pushmenu"
                            href="#"
                        >
                            <i className="fas fa-bars"/>
                        </button>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link to="/" className="nav-link">
                            <strong>Convênio : </strong>Polícia Militar
                        </Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {/*<Messages />*/}
                    {/*<Notifications />*/}
                    {/*<Languages />*/}
                    {/*<User />*/}
                    {/* <li className="nav-item">
                      <button
                        className="nav-link"
                        data-widget="control-sidebar"
                        data-slide="true"
                        type="button"
                      >
                        <i className="fas fa-th-large" />
                      </button>
                    </li> */}
                </ul>

                                                    {/*//MenuSuperior Direito*/}
                <ul className='navbar-nav ml-auto'>
                    <li className='nav-item dropdown mr-2'>
                        <a className='nav-link' data-toggle='dropdown' href='#'>
                            <i className='far fa-bell'></i>
                            <span className='badge badge-warning navbar-badge'> 10 </span>
                        </a>
                        <div className='dropdown-menu dropdown-menu-lg dropdown-menu-center animated--grow-in'>
                            <span className='dropdown-item dropdown-header text-bold'>Notificações</span>
                        <div className='dropdown-divider'></div>
                        <a href='#' className='dropdown-item'>
                            <i className='fas fa-file mr-2'></i> Consulta remarcada
                                <span className='float-right text-muted text-sm'>1 dia</span>
                        </a>
                        <div className='dropdown-divider'></div>
                        <a className='dropdown-item dropdown-footer cursor-pointer'>Ver mais notificações</a>
                    </div>
                    </li>
                    <li className='nav-item dropdown user-menu'>
                        <a className='nav-link d-flex cursor-pointer mt-n1 p-0' data-toggle='dropdown'>
                            <p className="mt-2">{usuario}</p>
                            <img className='rounded-circle img-pm-perfil ml-2 elevation-2' src={fotoUsuario}  alt={"Foto Usuário"}/>
                        </a>
                        <ul className='dropdown-menu dropdown-menu-lg dropdown-menu-right animated--grow-in mt-2'>

                            {/*//Foto do usuário*/}
                            <li className='user-header bg-primary'>
                                <img className='img-circle elevation-2' alt='PM Foto' src={fotoUsuario} />
                                <p>
                                    {usuario} <br /> Paciente
                                    <small>Cadastrado desde:   data </small>
                                </p>
                            </li>

                            {/*//-- Menu Body --*/}
                            <li className='user-body border-bottom-verdepetroleo'>
                            <div className='row'>
                                <div className='col-4 text-center'>
                                    <Botao tamanho={BOTAO.TAMANHO.PEQUENO}> Meu Prontuário </Botao>
						        </div>
                                <div className='col-4 text-center'>
                                    <Botao> Manual </Botao>
                                </div>
                                <div className='col-4 text-center'>
                                    <Botao href='alterarSenha'> Alterar Senha </Botao>
                                </div>
                            </div>
                            </li>
                            <li className='user-footer'>
                                {/*<a className='btn btn-danger float-right' href={this.sair} onclick={this.sair}>*/}
                                {/*    <i class='fas fa-power-off fa-sm fa-fw mr-2'></i>*/}
                                {/*    Sair1*/}
                                {/*</a>*/}
                                <Botao className='float-right' cor={BOTAO.COR.PERIGO} icone={'fas fa-power-off'} onClick={this.sair}>Sair</Botao>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        );
    };
}

