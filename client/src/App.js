import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import Wrapper from './components/Wrapper';

// Pages
import Welcome from './pages/Welcome';
import Members from './pages/Members';
import Forgot from './pages/Forgot';
import Signup from './pages/Signup';

//Context
import { AuthContext } from './context/auth';

function App() {
    const existingTokens = JSON.parse(localStorage.getItem('tokens'));
    const [authTokens, setAuthTokens] = useState(existingTokens);

    const setTokens = (data) => {
        localStorage.setItem('tokens', JSON.stringify(data));
        setAuthTokens(data);
    };
    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <Router>
                <div>
                    <Navbar />
                    <Switch>
                        <PrivateRoute
                            exact
                            path="/Members"
                            component={Members}
                        />
                        <Route exact path="/Forgot" component={Forgot} />
                        <Route exact path="/Signup" component={Signup} />
                        <Route path="/" component={Welcome} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
