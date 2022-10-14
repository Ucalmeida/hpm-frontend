import React from "react";
import { Route, Redirect } from "react-router-dom";
import storage from "../utils/storage";

export default function RouteWrapper({component: Component, isPrivate, ...rest}) {
    const signed = Boolean(storage.getUser());

    /**
     * Redirect user to SignIn page if he tries to access a private route
     * without authentication.
     */
    if (isPrivate && !signed) {
        return <Redirect to="/login"/>;
    }

    /**
     * Redirect user to Main page if he tries to access a non private route
     * (SignIn or SignUp) after being authenticated.
     */
    if (!isPrivate && signed) {
        return <Redirect to="/admin"/>;
    }

    /**
     * If not included on both previous cases, redirect user to the desired route.
     */
    return <Route {...rest} component={Component}/>;
}