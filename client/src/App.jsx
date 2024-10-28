//import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import styles from "./Components/Home/styles/homePage.module.css";

import Home from "./Components/Home/homePage";

import Navbar from "./Components/Shared/Navbar";
import Footer from "./Components/Shared/Footer";
import TournamentPage from "./Components/Tournament/tournamentView";
import Organizer from "./Components/Organizer_Home/components/Organizer";

const App = () => {
  return (
    <Router>
      <div className={styles.homePage}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route
            path="/client/tournament/:gameId"
            element={<TournamentPage />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
    // <Organizer />
  );
};

export default App;
