import React from "react";

export default class Input extends React.Component {

    render() {
        const {legenda} = this.props
        let small;
        if (legenda) {
            small = <small className="text-danger">{legenda}</small>
        }
        return (
            <div className={'form-group ' + this.props.className}>
                <label>{this.props.label}</label>
                <input className="form-control" {...this.props}/>
                {small}
            </div>
        );
    }
}