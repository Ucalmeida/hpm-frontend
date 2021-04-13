import React, {Component} from 'react';

function Icone (icone) {
    const icones = {
        facebook: 'fab fa-facebook',
        google: 'fab fa-google',
        googlePlus: 'fab fa-google-plus',
        salvar: 'far fa-save',
        imprimir: 'fas fa-print',
        pesquisar: 'fas fa-search',
        erro: 'far fa-times-circle',
        ok: 'far fa-check-circle'
    };

    return (
        <i className={`${icones[icone]} mr-2`}></i>
    );
}
export default Icone;