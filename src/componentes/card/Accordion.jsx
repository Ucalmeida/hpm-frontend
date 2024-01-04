import React from "react";
import PropTypes from "prop-types";
import { getBotaoFechar, getBotaoMax } from "./index";
import { getClasse } from "../index";

export const Accordion = (props) => {
  const getAberto = () => {
    return props.aberto === false ? " collapsed-card" : "";
  };

  return (
    <div
      className={`card card-primary${getClasse(props.className)}${getAberto()}`}
      id={props.id}
    >
      <div className="card-header p-1 pt-2 px-3">
        <h3 className="card-title">
          <a
            href={props.titulo}
            className="d-block cursor-pointer"
            data-card-widget="collapse"
          >
            {props.titulo}
          </a>
        </h3>
        <div className="card-tools">
          <button
            type="button"
            className="btn btn-tool"
            data-card-widget="collapse"
          >
            <i className="fas fa-plus"></i>
          </button>
          {getBotaoMax(props.botaoMax)} {getBotaoFechar(props.botaoMax)}
        </div>
      </div>
      <div className="card-body">{props.children}</div>
    </div>
  );
};

Accordion.propTypes = {
  aberto: PropTypes.bool,
  botaoFechar: PropTypes.bool,
  botaoMax: PropTypes.bool,
  className: PropTypes.string,
  cor: PropTypes.string,
  id: PropTypes.string,
  titulo: PropTypes.string,
  children: PropTypes.node,
};
