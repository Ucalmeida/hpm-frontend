import React, {Component} from "react";
import MenuLateral from "./MenuLateral";
import Topo from "./Topo";
import Rodape from "./Rodape";
import BotaoScrollTop from "./BotaoScrollTop";
import { Helmet } from 'react-helmet';

export default class Pagina extends Component {

    render() {
    let titulo = "Portal HPM"
        if (this.props.titulo != null) {
            titulo = titulo + " | " + this.props.titulo
        }
    window.document.title = titulo;
        return (
            <div className="content-wrapper">
                <section className='content-header'>
                    <div className='container-fluid'>
                        <div className='row mb-2'>
                            <div className='col-sm-12'>
                                <div className='row'>
                                    <div className='col-auto'>
                                        <h1 className='m-0 text-verdepetroleo'>
                                            {this.props.titulo}
                                        </h1>
                                    </div>
                                </div>
                                {this.props.subTitulo}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className='container-fluid'>
                        {this.props.children}
                    </div>
                </section>
            </div>
        )
    };
};