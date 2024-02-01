import React from "react";
import PropTypes from "prop-types";
import {getBotaoFechar, getBotaoMax, getBotaoMin} from "./index";
import {CARD} from "../../util/Constantes";
import {getClasse} from "../index";

function Card (props) {

    const getCor = () => {
        if (!props.cor) return CARD.COR.PRIMARIO;
        return props.cor;
    }

    const botoes = () => {
        if (props.botaoFechar || props.botaoMax || props.botaoMin){
            return (
                <div className={"card-tools"}>
                    {getBotaoMin(props.botaoMin)}
                    {getBotaoMax(props.botaoMax)}
                    {getBotaoFechar(props.botaoFechar)}
                </div>
            )
        } return "";
    }
    const cabecalho = () => {
        if (!props.titulo) return "";
        return (
            <div className='card-header p-1 pt-2 px-3'>
                <h3 className='card-title'>{props.titulo}</h3>
                {botoes()}
            </div>
        )
    };

    return (
      <div className={"card "+getClasse(props.className)+getCor()}>
          {cabecalho()}
          <div className="card-body">
            {props.children}
          </div>
      </div>
    );
}
Card.propTypes = {
    botaoFechar : PropTypes.bool,
    botaoMax : PropTypes.bool,
    botaoMin : PropTypes.bool,
    className: PropTypes.string,
    cor: PropTypes.string,
    titulo: PropTypes.string,

}
export {Card}