import React from "react";

export class Input extends React.Component {

    render() {
        const {legenda} = this.props
        let small;
        if (legenda) {
            small = <small className="text-danger">{legenda}</small>
        }
        return (
            <div className={'form-group ' + this.props.className}>
                <label>{this.props.label}</label>
                <input autoComplete="off" className="form-control" {...this.props}/>
                {small}
            </div>
        );
    }
}

export default Input;
