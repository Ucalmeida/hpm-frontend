import React from 'react';
import PropTypes from "prop-types";

function Accordion (props) {
      const getBotaoFechar = () => {
          if (!props.botaoFechar) return "";
          return (
              <button type="button" className="btn btn-tool" data-card-widget="remove"> <i className="fas fa-times"></i> </button>
          )
      };
      const getBotaoMax = () => {
          if (!props.botaoMax) return "";
          return (
              <button type="button" className="btn btn-tool" data-card-widget="maximize"> <i className="fas fa-maximize"></i> </button>
          )
      };
    return (
      <div className="card card-primary collapsed-card" id={props.id}>
        <div className="card-header p-1 pt-2 px-3">
            <h3 className="card-title">
                <a className="d-block cursor-pointer" data-card-widget="collapse"> {props.titulo}</a>
            </h3>
            <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse"> <i className="fas fa-plus"></i> </button>
                {getBotaoMax() + getBotaoFechar()}
            </div>
        </div>
        <div className="card-body">
          {props.children}
        </div>
      </div>
    );
}
Accordion.propTypes = {
        botaoFechar : PropTypes.bool,
        botaoMax : PropTypes.bool,
        cor : PropTypes.string,
        id : PropTypes.string,
        titulo : PropTypes.string,
    }
export {Accordion};
