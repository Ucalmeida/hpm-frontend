import React from 'react';
import {getClasse} from "./index";
import PropTypes from "prop-types";

export function Icone (props) {
    //TODO falta implementar se o icone for SVG
    const cor = (!props.cor) ? "" : props.cor;
    const margem = (props.margem) ? " mr-2" : "";
    return (
        <i id={props.id} onClick={props.onClick} className={getClasse(props.className) + props.icone + margem + cor}></i>
    );
}
Icone.defaultProps = {
    margem: true
}
Icone.propTypes = {
    icone: PropTypes.string.isRequired,
    cor: PropTypes.string,
    margem: PropTypes.bool,
    className: PropTypes.string,
    id: PropTypes.any,
}