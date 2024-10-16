//import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import styles from './Components/Home/styles/homePage.module.css';

import Home from './Components/Home/homePage'
import About from './Components/Tournament/tournamentView'

import Navbar from './Components/Shared/Navbar';
import Footer from './Components/Shared/Footer';

const App = () => {
  return (
    <Router>
      <div className={styles.homePage}>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App
