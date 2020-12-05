import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Members from '../../pages/Members';
import Profile from '../../pages/Profile';
import AddChild from '../../pages/AddChild';
import Donations from '../../pages/Donations';

import Navbar from '../Navbar';
import Chat from '../Chat';
import Footer from '../Footer';

import { GlobalContextProvider } from '../../utils/GlobalContext';

const Router = () => (
    <GlobalContextProvider>
        <Route component={Navbar} />
        <Switch>
            <Route exact path="/Members/Profile" component={Profile} />
            <Route exact path="/Members/AddChild" component={AddChild} />
            <Route exact path="/Members/Donations" component={Donations} />
            <Route path="/Members" component={Members} />
        </Switch>
        <Route component={Chat} />
        <Footer />
    </GlobalContextProvider>
);

export default Router;
