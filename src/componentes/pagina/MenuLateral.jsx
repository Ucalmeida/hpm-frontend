import React from "react";
import {NavLink, Link} from "react-router-dom";

const MenuLateral = ({usuario}) => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to="/" className="brand-link">
                <img
                    src="/img/logo.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{opacity: '.8'}}
                />
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </Link>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            // src={usuario.foto || '/img/default-profile.png'}
                            className="img-circle elevation-2"
                            alt="User"
                        />
                    </div>
                    <div className="info">
                        <Link to="/profile" className="d-block">
                            {/*{usuario.email}*/}
                        </Link>
                    </div>
                </div>
                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        <li className="nav-item">
                            <NavLink to="/" exact className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>Dashboardd</p>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default MenuLateral;


// menuLateral = "<aside class='main-sidebar sidebar-dark-primary elevation-4'>" +
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