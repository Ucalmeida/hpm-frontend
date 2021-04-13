import React, {Component} from 'react';
import {Spinner as SpinnerReact} from "react-bootstrap";


class Spinner extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12 text-center">
                    <SpinnerReact
                        {...this.props}
                        animation="border"
                        variant="primary"
                    >
                    </SpinnerReact>
                </div>
            </div>
        );
    }
}

export default Spinner;