import React from "react";

export default class Card extends React.Component {

    getCor() {
        const cor = this.props.cor;
        if (!cor) return "card-default";
        return cor;
    }

    render() {
        const cabecalho = this.props.titulo ?
            <div className='card-header'>
                <h4 className='card-title w-100'>{this.props.titulo}</h4>
            </div> : "";

        return (
          <div className={"card "+this.getCor()}>
              {cabecalho}
              <div className="card-body">
                {this.props.children}
              </div>
          </div>
        );
    }
}
