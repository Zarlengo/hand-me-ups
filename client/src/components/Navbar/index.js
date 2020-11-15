import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
    return (
        <nav className="navbar">
            <Link className="navbar-brand" to="/">
                Hand Me Ups
            </Link>
            <div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link
                            to="/Members"
                            className={
                                window.location.pathname === '/Members'
                                    ? 'nav-link active'
                                    : 'nav-link'
                            }
                        >
                            Members
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/Profile"
                            className={
                                window.location.pathname === '/Profile'
                                    ? 'nav-link active'
                                    : 'nav-link'
                            }
                        >
                            Profile
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
