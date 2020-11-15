import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Forgot from '../../pages/Forgot';
import Signup from '../../pages/Signup';
import Members from '../../pages/Members';
import Welcome from '../../pages/Welcome';

const Router = () => (
    <Switch>
        <Route exact path="/Members" component={Members} />
        <Route exact path="/Forgot" component={Forgot} />
        <Route exact path="/Signup" component={Signup} />
        <Route path="/" component={Welcome} />
    </Switch>
);

export default Router;
