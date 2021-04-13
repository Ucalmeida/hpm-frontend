import React, {Component} from 'react';

class Accordion extends Component {
  render() {
      const getBotaoFechar = () => {
          return "teste"
      };
      const botaoMax = "";
    return (
      <div className="card card-primary collapsed-card" id={"#"+this.props.id}>
        <div className="card-header">
            <h3 className="card-title">
                <a className="d-block cursor-pointer" data-card-widget="collapse"> {this.props.titulo} {getBotaoFechar()}</a>
            </h3>
            <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus"></i>
                </button>
            </div>
        </div>
        <div className="card-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Accordion;