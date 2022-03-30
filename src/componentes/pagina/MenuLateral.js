import {NavLink, Link} from "react-router-dom";

import logoHPM from "../../img/brasoes/brasao_hpm.png";
import {Icone} from "../Icone";
import {CompararArrayObjetos, Logado} from "../../util";
import {acoes} from "../../json/acoes.js"

export default function () {
    if (!Logado()) return "";

    const menu = acoes.sort(CompararArrayObjetos("nome")).map((acao) => {
        if (!acao.acoes) {
            return (
                <li className="nav-item" key={acao.url}>
                    <NavLink to={'/' + acao.url} exact className="nav-link">
                        <Icone icone={acao.icone} className={"nav-icon"} margem={false}/>
                        <p>{acao.nome}</p>
                    </NavLink>
                </li>
            )
        } else {
            return submenu(acao)
        }
    });

    function ativarMenuSelecionado(e) {
        let a,li
        if (e.target.nodeName === "A") {
            a = e.target
            li = e.target.parentElement
        } else if (e.target.classList.contains("nav-icon")) {
            a = e.target.parentElement
            li = e.target.parentElement.parentElement
        } else {
            a = e.target.parentElement.parentElement
            li = e.target.parentElement.parentElement.parentElement
        }
        if (li.classList.contains("menu-open")) a.classList.remove("active")
        else a.classList.add("active")
    }
    function submenu(subAcoes) {
        return (
            <li className='nav-item' key={subAcoes.url}>
                <a onClick={ativarMenuSelecionado} className={"nav-link"}>
                    <Icone icone={subAcoes.icone} className={"nav-icon"} margem={false}/>
                    <p>
                        {subAcoes.nome}
                        <Icone icone={"fas fa-angle-down"} className={"right"} margem={true}/>
                    </p>
                </a>
                <ul className='nav nav-treeview'>
                    {subAcoes.acoes.sort(CompararArrayObjetos("nome")).map((acao) => {
                        if (!acao.acoes) {
                            return (<li className="nav-item" key={acao.url}>
                                <NavLink to={"/" + subAcoes.url + "/" + acao.url} exact className="nav-link">
                                    <Icone icone={acao.icone} className={"nav-icon"} margem={false}/>
                                    <p>{acao.nome}</p>
                                </NavLink>
                            </li>)
                        } else {
                            return submenu(acao)
                        }
                    })}
                </ul>
            </li>
        )
    }

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