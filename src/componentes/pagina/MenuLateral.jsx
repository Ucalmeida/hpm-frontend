import React from "react";
import {NavLink, Link} from "react-router-dom";

import logoHPM from "../../img/brasoes/brasao_hpm.png";

const MenuLateral = ({usuario}) => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
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
                        className="nav nav-pills nav-sidebar flex-column"
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
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default MenuLateral;


//     "<aside class='main-sidebar sidebar-dark-primary elevation-4'>" +
//     "<a href='"+link+"' class='brand-link border-bottom-verdepetroleo'>" +
//     "<img src='/portal/images/brasoes/brasao_pm_60x60.png' alt='PMSE Logo' class='brand-image' >" +
//     "<span class='brand-text font-weight-bold'>PORTAL" +
//     "<span class='ml-5'>"+getModuloIcone()+"</span>" +
//     "<br>"+modulo.toUpperCase()+"</span>" +
//     "</a>" +
//     "<div class='sidebar'>" +
//     "<nav class='mt-2 pb-5'>" +
//     "<ul class='nav nav-pills nav-sidebar flex-column nav-child-indent' data-widget='treeview' role='menu' data-accordion='false'>" +
//     menu +
//     "</ul>" +
//     "</nav>" +
//     "</div>" +
//     "</aside>";
// }
// return menuLateral;