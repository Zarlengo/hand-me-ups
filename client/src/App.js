import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import Wrapper from './components/Wrapper';

// Pages
import Welcome from './pages/Welcome';
import Members from './pages/Members';
import Forgot from './pages/Forgot';
import Signup from './pages/Signup';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route exact path="/Members" component={Members} />
                    <Route exact path="/Forgot" component={Forgot} />
                    <Route exact path="/Signup" component={Signup} />
                    <Route path="/" component={Welcome} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
