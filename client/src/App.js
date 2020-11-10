import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import Wrapper from './components/Wrapper';

// Pages
import Welcome from './pages/Welcome';
import Members from './pages/Members';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    {/* <Wrapper> */}
                    <Route exact path="/" component={Welcome} />
                    <Route exact path="/Members" component={Members} />
                    {/* </Wrapper> */}
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
