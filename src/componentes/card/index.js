import React from "react";

export function getBotaoFechar (botao) {
    if (!botao) return "";
    return (
        <button type="button" className="btn btn-tool" data-card-widget="remove"> <i className="fas fa-times"></i> </button>
    )
};

export function getBotaoMax (botao) {
    if (!botao) return "";
    return (
        <button type="button" className="btn btn-tool" data-card-widget="maximize"> <i className="fas fa-expand"></i> </button>
    )
};

export function getBotaoMin (botao) {
    if (!botao) return "";
    return (
        <button type="button" className="btn btn-tool" data-card-widget="collapse"> <i className="fas fa-minus"></i> </button>
    )
};