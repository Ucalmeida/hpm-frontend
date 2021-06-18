import React from "react";
import {NavLink, Link} from "react-router-dom";

import logoHPM from "../../img/brasoes/brasao_hpm.png";
import {Icone} from "../Icone";
import {Logado} from "../../util";
import {acoes} from "./acoes.js"

export default class MenuLateral extends React.Component {

    render() {
        const menu = acoes.map((acao) => {
                if (!acao.acoes) {
                    return (
                        <li className="nav-item" key={acao.url}>
                            <NavLink to={'/'+acao.url} exact className="nav-link">
                                <Icone icone={acao.icone} className={"nav-icon"} margem={false}/>
                                <p>{acao.nome}</p>
                            </NavLink>
                        </li>
                    )
                } else {
                    return submenu(acao)
                }
            });

        function submenu (subAcoes) {
            return (
                <li className='nav-item' key={subAcoes.url}>
                    <a href="#" className="nav-link">
                        <Icone icone={subAcoes.icone} className={"nav-icon"} margem={false}/>
                        <p>
                            {subAcoes.nome}
                            <Icone icone={"fas fa-angle-down"} className={"right"} margem={true}/>
                        </p>
                    </a>
                    <ul className='nav nav-treeview'>
                        {subAcoes.acoes.map((acao) => {
                         if (!acao.acoes) {
                            return ( <li className="nav-item" key={acao.url}>
                                     <NavLink to={"/"+subAcoes.url+"/"+acao.url} exact className="nav-link">
                                         <Icone icone={acao.icone} className={"nav-icon"} margem={false}/>
                                         <p>{acao.nome}</p>
                                     </NavLink>
                                 </li>)
                         } else {
                             return submenu(acao)
                         }
                     }) }
                    </ul>
                </li>
            )
        }

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
                            {menu}
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    };
};