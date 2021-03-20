import React from "react";
import {Link, Redirect} from "react-router-dom";

export default class Topo extends React.Component {
    constructor(toggleMenuSidebar) {
        super();
        this.toggleMenuSidebar = toggleMenuSidebar
        let usuario = localStorage.getItem('usuario');

        this.state = {
            usuario: usuario
        }
    }

    sair = (e) => {
        e.preventDefault();
        localStorage.clear();
        this.setState({usuario: ''});
    }

    render() {
        const {usuario} = this.state
        if (!usuario) {
            return <Redirect to='/'/>
        }
        return (

// <nav class='main-header navbar navbar-expand navbar-white navbar-light'>
//         iconeMenu +
//         <ul class='navbar-nav'>
//         <li class='nav-item d-none d-md-inline-block mr-n4'>
//         <a href='#' class='nav-link'>" +
//         (!pessoaLogada.isMilitar() ? "QCG" : ltb == null ? "PM1" : getUnidade(ltb))
//         </a>
//         </li>
//         <li class='nav-item d-none d-md-inline-block mr-n4'>
//        <a href='#' class='nav-link'><i class='fas fa-angle-right'></i></a>
//         </li>
//         <li class='nav-item d-none d-md-inline-block mr-n4'>
//         <a href='#' class='nav-link'>" +
//         (!pessoaLogada.isMilitar() ? "CIVIS" : ltb == null ? "INATIVOS" : getUnidadeSetor(ltb))
//         </a>
//        </li>
//         <li class='nav-item d-none d-md-inline-block mr-n4'>
//        <a href='#' class='nav-link'><i class='fas fa-angle-right'></i></a>
//        </li>
//         <li class='nav-item d-none d-md-inline-block mr-n4'>
//        <a href='#' class='nav-link'>
//         (!pessoaLogada.isMilitar() ? "CIVIL" : ltb == null ? "INATIVO" : getUnidadeSetorFuncao(ltb))
//         </a>
//         </li>
//         </ul>
//         {/*//MenuSuperior Direito*/}
//         <ul class='navbar-nav ml-auto'>
//         menuLtb
//         notificacoes
//         contadorSessao
//         <li class='nav-item dropdown user-menu'>
//        <a class='nav-link d-flex cursor-pointer mt-n1 p-0' data-toggle='dropdown' >
//         this.infoUsuario
//         <img class='rounded-circle img-pm-perfil ml-2 elevation-2' src='/portal/dwFoto?fileName=" + pessoaLogada.getId() + "' />
//        </a>
//         "<ul class='dropdown-menu dropdown-menu-lg dropdown-menu-right animated--grow-in mt-2'>
//         //Foto do usuário
//        <li class='user-header bg-primary'>
//         <img class='img-circle elevation-2' alt='PM Foto' src='/portal/dwFoto?fileName=" + pessoaLogada.getId() + "' />
//         <p>
//         pessoaLogada.getNome()  <br /> getPatente()
//         <small>Na corporação desde:   CassUtil.getDataFormatada(pessoaLogada.getDataAdmissao()) </small>
//         </p>
//         </li>
//         //-- Menu Body --
//         funcoes +
//         //-- Menu Footer--
//        <li class='user-footer'>
//         fecharModulo
//         <button class='btn btn-danger float-right' onclick='sair()'>
//         <i class='fas fa-power-off fa-sm fa-fw mr-2'></i>
//         "Sair"
//         </button>
//         </li>
//         </ul>
//         </li>
//        </ul>
//         </nav>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button
                            onClick={this.toggleMenuSidebar}
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
                            Header
                        </Link>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link to="/" className="nav-link">
                            Contato
                        </Link>
                    </li>
                </ul>
                <form className="form-inline ml-3">
                    <div className="input-group input-group-sm">
                        <input
                            className="form-control form-control-navbar"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <div className="input-group-append">
                            <button className="btn btn-navbar" type="submit">
                                <i className="fas fa-search"/>
                            </button>
                        </div>
                        <div className="ml-4 input-group-append">
                            <label> {usuario}</label>
                        </div>
                        <div className="ml-4 input-group-append">
                            <Link to="/alterarSenha"> Alterar Senha </Link>
                        </div>
                        <div className="ml-4 input-group-append">
                            <a href="#" onClick={this.sair}> sair </a>
                        </div>
                    </div>
                </form>
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
            </nav>
        );
    };
}


//