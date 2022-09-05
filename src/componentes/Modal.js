import React from 'react';
import {string} from "prop-types";
import {BotaoImprimir} from "./Botao";
import {BOTAO} from "../util/Constantes";

let valoresModal = {
    idLista: string,
    titulo: string
};

export function Modal({idLista, tituloModal}: valoresModal) {
    console.log("ID:", idLista);

    function handleImprimir() {
        alert('Imprimiu');
    }

    return (
        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="myModalLabel">{tituloModal}</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body">
                        <h2 value={idLista}>Novo Teste: {idLista}</h2>
                        <label>Paciente </label><br />
                        <label> CPF </label><br />
                        <label> Data - Hora</label><br />
                        <label>Especialidade</label><br />
                        <label>Médico</label><br />
                        <label>Sala</label><br />
                        <label>Piso</label><br />
                        <label>Status</label>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Fechar</button>
                        <BotaoImprimir
                            data-toggle="modal"
                            data-target="#myModalImpressao"
                            cor={BOTAO.COR.PRIMARIO}> Imprimir </BotaoImprimir>
                    </div>
                </div>
            </div>
        </div>
    );
};

