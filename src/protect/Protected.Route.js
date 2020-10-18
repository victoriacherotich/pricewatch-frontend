import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AdminValidate = () => {
    try {   
        const userToken = localStorage.getItem('jwtToken');
        return jwtDecode(userToken);
    } catch (error) {
        return 0;
    }
};

const user = AdminValidate();

export const MyCredentials = () => {
    try {   
        const userToken = localStorage.getItem('jwtToken');
        return jwtDecode(userToken);
    } catch (error) {
        return 0;
    }
};

export const UserLoggedIn = () => {
    try {   
        const userToken = localStorage.getItem('jwtToken');
        if (userToken) {
            return true;
        }else{
            return false;
        }
    } catch (error) {
        return false;
    }
};

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props =>
        localStorage.getItem("jwtToken") ? ( <Component {...props} /> ) : ( <Redirect to="/" /> )
        }
    />
);

export const ProtectAdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => 
        (user.socket_auth_user_primary_privilages) ? ( <Component {...props} /> ) : ( <Redirect to="/" /> )
        }
    />
);

export default {ProtectAdminRoute, ProtectedRoute, UserLoggedIn, MyCredentials};
