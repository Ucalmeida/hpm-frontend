import React from "react";
import { Route, Redirect } from "react-router-dom";
import {Logado} from "./Util";


const ProtectedRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
               Logado() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};
export default ProtectedRoute;