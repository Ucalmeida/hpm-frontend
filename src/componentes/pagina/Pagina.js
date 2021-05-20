import React from "react";
import Topo from "./Topo";
import MenuLateral from "./MenuLateral";
import Rodape from "./Rodape";
import BotaoScrollTop from "./BotaoScrollTop";
import PropTypes from "prop-types";
import {Logado} from "../../util/Util";
import {Redirect} from "react-router-dom";

export function Pagina (props) {


    let titulo = "Portal HPM"
        if (props.titulo != null) {
            titulo = titulo + " | " + props.titulo
        }
    if (!Logado()) {
        return <Redirect to={"/login"} />
    }

    //Checagem de classes de layout interno x externo
    const cssBody = document.getElementById('root').classList;
    if (cssBody.contains('login-page')) {
        document.getElementById('root').classList.add('hold-transition','sidebar-mini','layout-fixed');
        document.getElementById('root').classList.remove('login-page');
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
    )
}
Pagina.propTypes = {
    titulo: PropTypes.string,
    subTitulo: PropTypes.string
}