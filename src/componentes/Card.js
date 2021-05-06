import React from "react";
import PropTypes from "prop-types";

function Card (props) {

    const getCor = () => {
        const cor = props.cor;
        if (!cor) return " card-primary";
        return cor;
    }

    const cabecalho = props.titulo ?
        <div className='card-header p-1 pt-2 px-3'>
            <h3 className='card-title'>{props.titulo}</h3>
        </div> : "";

    return (
      <div className={"card "+props.className+getCor()}>
          {cabecalho}
          <div className="card-body">
            {props.children}
          </div>
      </div>
    );
}
Card.propTypes = {
    titulo: PropTypes.string,
    cor: PropTypes.string,
    className: PropTypes.string,

}
export {Card}