import React from "react";
import PropTypes from "prop-types";
import {Logado, ValidaToken} from "../../util";

export function Pagina (props) {

    // ValidaToken()

    let titulo = "Portal HPM"
        if (props.titulo != null) {
            titulo = titulo + " | " + props.titulo
        }

    //Checagem de classes de layout interno x externo
    const cssBody = document.getElementById('body').classList;
    if (cssBody.contains('login-page')) {
        document.getElementById('body').classList.add('sidebar-mini','layout-fixed');
        document.getElementById('body').classList.remove('login-page');
    }
    window.document.title = titulo;
    if (!Logado()) return "";
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