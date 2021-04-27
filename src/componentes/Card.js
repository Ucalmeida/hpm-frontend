import React from "react";

export class Card extends React.Component {

    getCor() {
        const cor = this.props.cor;
        if (!cor) return " card-primary";
        return cor;
    }

    render() {
        const cabecalho = this.props.titulo ?
            <div className='card-header p-1 pt-2 px-3'>
                <h3 className='card-title'>{this.props.titulo}</h3>
            </div> : "";

        return (
          <div className={"card"+this.getCor()}>
              {cabecalho}
              <div className="card-body">
                {this.props.children}
              </div>
          </div>
        );
    }
}
