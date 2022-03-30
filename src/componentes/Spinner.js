import React from 'react';
import {Spinner as SpinnerReact} from "react-bootstrap";


function Spinner (props) {
    return (
        <div className="row">
            <div className="col-12 text-center">
                <SpinnerReact
                    {...props}
                    animation="border"
                    variant="primary"
                >
                </SpinnerReact>
            </div>
        </div>
    );
}
export {Spinner};