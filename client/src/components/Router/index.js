import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Forgot from '../../pages/Forgot';
import Signup from '../../pages/Signup';
import Members from '../../pages/Members';
import Welcome from '../../pages/Welcome';
import Profile from '../../pages/Profile';
import AddChild from '../../pages/AddChild';
import Login from '../../pages/Login';

import API from '../../utils/API';

const PrivateRoute = ({ component, ...options }) => {
    if (API.getCurrentUser()) {
        return <Route {...options} component={component} />;
    }
    return <Redirect to={'/'} />;
};

PrivateRoute.propTypes = {
    options: PropTypes.object,
    component: PropTypes.func.isRequired,
};

const Router = () => (
    <Switch>
        <PrivateRoute exact path="/Members" component={Members} />
        <PrivateRoute exact path="/Profile" component={Profile} />
        <PrivateRoute exact path="/AddChild" component={AddChild} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Forgot" component={Forgot} />
        <Route exact path="/Signup" component={Signup} />

        <Route path="/" component={Welcome} />
    </Switch>
);

export default Router;
