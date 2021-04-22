import React, {Fragment} from "react";
import {version} from "../../../package.json";
import {IsLogado} from "../../util/Util";

export default class Rodape extends React.Component {

    render() {
        if (!IsLogado) return "";
        return (
            <Fragment>
                <footer className="main-footer text-center">
                    <div className="row">
                        <div className="col-4">
                            <div className='float-left d-none d-sm-inline-block'>
                                <small>dev - HPM </small>
                            </div>
                        </div>
                        <div className="col-4">
                            <span className='text-primary text-bold'>NTI - </span><span
                            className='d-none d-lg-inline-block'>POLÍCIA MILITAR DO ESTADO DE SERGIPE</span><span
                            className='text-bold d-md-block d-lg-none'>PMSE</span>
                        </div>
                        <div className="col-4">
                            <div className="float-right d-none d-sm-inline-block pr-5">
                                <b>Versão </b>
                                <span>{version}</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </Fragment>
        );
    }
};