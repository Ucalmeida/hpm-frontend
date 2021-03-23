import React, {Component} from 'react';

class Accordion extends Component {
  render() {
    return (
      <div className="card card-primary">
        <div className="card-header">
          ttulo
        </div>
        <div className="card-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Accordion;