import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import Wrapper from './components/Wrapper';

// Pages
import Welcome from './pages/Welcome';
import Members from './pages/Members';
import Profile from './pages/Profile';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    {/* <Wrapper> */}
                    <Route exact path="/" component={Welcome} />
                    <Route exact path="/Members" component={Members} />
                    <Route exact path="/Profile" component={Profile} />

                    {/* </Wrapper> */}
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
