import React from 'react';

const Icone = ({icone, cor, margem, ...otherProps}) => {
    //TODO falta implementar se o icone for SVG
    if (!cor) cor = "";
    if (!margem) margem = " mr-2"; else margem = " ";
    return (<i className={icone+margem+cor} {...otherProps}></i>);
}
export default Icone;