import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Router from './components/Router';
import Footer from './components/Footer';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Router />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
