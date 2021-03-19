import React from "react";
import Pagina from "./main/Pagina";
import {Redirect} from "react-router-dom";

export default class Principal extends React.Component {
    constructor() {
        super();
        let usuario = localStorage.getItem('usuario');
        this.state = {
            usuario: usuario
        }
    }

    componentDidMount() {

    }

    render() {
        const {usuario} = this.state;
        if (!usuario) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <Pagina conteudo={'Teste'}/>
            </div>
        );
    }
}