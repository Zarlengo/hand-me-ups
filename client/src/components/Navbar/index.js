import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Notification from '../notification';
import API from '../../utils/API';
import './style.css';

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
    const history = useHistory();

    const logout = () => {
        API.logout();
        history.push('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-branding">
                <div className="navbar-brand">
                    <h1>Hand Me Ups</h1>
                </div>
            </div>
            <div>
                <ul className="nav-list">
                    <li>
                        <Notification />
                    </li>
                    <li className="nav-spacer">|</li>
                    <li className="nav-item">
                        <NavLink
                            exact
                            to="/Members"
                            className="nav-link"
                            activeClassName="active"
                        >
                            Members
                        </NavLink>
                    </li>
                    <li className="nav-spacer">|</li>
                    <li className="nav-item">
                        <NavLink
                            exact
                            to="/Members/Profile"
                            className="nav-link"
                            activeClassName="active"
                        >
                            Profile
                        </NavLink>
                    </li>
                    <li className="nav-spacer">|</li>
                    <li className="nav-item" onClick={logout}>
                        <span className="nav-link">Logout</span>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
