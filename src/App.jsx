import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import styles from './styles/Home.module.css';

import Home from './Components/User/Home'
import About from './Components/User/About';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

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
