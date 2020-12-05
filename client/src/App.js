import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Forgot from './pages/Forgot';
import Signup from './pages/Signup';
import Router from './components/Router';
import Welcome from './pages/Welcome';

import API from './utils/API';

import './App.css';

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

const App = () => (
    <Switch>
        <PrivateRoute path="/Members" component={Router} />
        <Route exact path="/Forgot" component={Forgot} />
        <Route exact path="/Signup" component={Signup} />
        <Route path="/" component={Welcome} />
    </Switch>
);

export default App;
