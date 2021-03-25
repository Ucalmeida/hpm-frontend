import React, {Component} from "react";
import Pagina from "../componentes/pagina/Pagina";
import Topo from "../componentes/pagina/Topo";
import MenuLateral from "../componentes/pagina/MenuLateral";
import Rodape from "../componentes/pagina/Rodape";
import BotaoScrollTop from "../componentes/pagina/BotaoScrollTop";
import {Redirect} from "react-router-dom";

export default class Principal extends Component {

    constructor() {
        super();
    }

    render() {
        let token = localStorage.getItem('token')
        if(!token) {
            return <Redirect to={'/login'} />
        };
        let titulo = "Portal HPM"
        if (this.props.titulo != null) {
            titulo = titulo + " | " + this.props.titulo
        }
        document.getElementById('root').classList.remove('login-page');
        document.getElementById('root').classList.add('hold-transition','sidebar-mini','layout-fixed');
        window.document.title = titulo;
        return (
            1111
        )
    };
};