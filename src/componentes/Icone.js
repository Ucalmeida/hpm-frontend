import React from 'react';

function Icone ({icone, cor, margem, className, ...otherProps}) {
    //TODO falta implementar se o icone for SVG
    if (!cor) cor = "";
    if (margem === false) margem = ""; else margem = "  mr-2";
    return (<i className={className+" "+icone+margem+cor} {...otherProps}></i>);
}

export {Icone};