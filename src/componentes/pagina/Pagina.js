import React from "react";
import Topo from "./Topo";
import MenuLateral from "./MenuLateral";
import Rodape from "./Rodape";
import BotaoScrollTop from "./BotaoScrollTop";
import {IsLogado} from "../../util";
import PropTypes from "prop-types";

export function Pagina (props) {


    let titulo = "Portal HPM"
        if (props.titulo != null) {
            titulo = titulo + " | " + props.titulo
        }
    if (IsLogado) {
        document.getElementById('root').classList.remove('login-page');
        document.getElementById('root').classList.add('hold-transition','sidebar-mini','layout-fixed');
    } else {
        document.getElementById('root').classList.add('login-page');
    }
    window.document.title = titulo;
    return (
        <div className="wrapper">
            <Topo />
            <MenuLateral />
         <div className="content-wrapper">
             <section className='content-header'>
                 <div className='container-fluid'>
                     <div className='row mb-2'>
                         <div className='col-sm-12'>
                             <div className='row'>
                                 <div className='col-auto'>
                                     <h1 className='m-0 text-verdepetroleo'>
                                         {props.titulo}
                                     </h1>
                                 </div>
                             </div>
                             {props.subTitulo}
                         </div>
                     </div>
                 </div>
             </section>
             <section className="content">
                 <div className='container-fluid'>
                     {props.children}
                 </div>
             </section>
         </div>
            <Rodape />
            <BotaoScrollTop />
     </div>

    )
}
Pagina.propTypes = {
    titulo: PropTypes.string,
    subTitulo: PropTypes.string
}