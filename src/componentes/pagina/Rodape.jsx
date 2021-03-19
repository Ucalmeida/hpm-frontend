import React from "react";
import {version} from "../../../package.json";

const Rodape = () => {
    return (
        <footer className="main-footer">
            <div className="float-right d-none d-sm-block">
                <b>Versão</b>
                <b> </b>
                <span>{version}</span>
            </div>
            <strong>
                <span>Copyright © 2019-2020 </span>
                <a
                    href="http://adminlte.io"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    AdminLTE.io
                </a>
                <span>.</span>
            </strong>
            <span> </span>
            <span>HPM - PMSE</span>
        </footer>
    );

};

export default Rodape;


//
// "<footer class='main-footer text-center "+ corAmbiente +" '>" +
// "<div class='row bg-'>"+
// "<div class='col-4'>"+
// "<div class='float-left d-none d-sm-inline-block'>" +
// "<small>Ambiente: "+ ambienteBd +"</small> " +
// "</div>" +
// "</div>" +
// "<div class='col-4'>"+
// "<span class='text-primary text-bold'>NTI - </span><span class='d-none d-lg-inline-block'>POLÍCIA MILITAR DO ESTADO DE SERGIPE</span><span class='text-bold d-md-block d-lg-none'>PMSE</span>" +
// "</div>" +
// "<div class='col-4'>"+
// "<div class='float-right d-none d-sm-inline-block pr-5'>" +
// "<i class='small'>" +
// "Endereço IP: " + pageContext.getRequest().getRemoteAddr() +
// //							CassUtil.getDataDiaFormatada(Calendar.getInstance())+
// "</i>"+
// "</div>" +
// "</div>" +
// "</div>" +
// "</footer>" +
// "<a id='back-to-top' href='#' class='btn btn-primary btn back-to-top' role='button'>" +
// "<i class='fas fa-chevron-up'></i>" +
// "</a>";