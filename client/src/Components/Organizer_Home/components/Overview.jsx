import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/OverviewPage.css";

const Overview = () => {
  const location = useLocation();
  const [tournamentData, setTournamentData] = useState([]);
  // const { tournamentId } = location.state || {};
  const { tournamentId } = "673c578dabdf05c35e1fc98b";

  const fetchTournamentData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/client/tournament/getTournamentByTournamentId/673c578dabdf05c35e1fc98b`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTournamentData(data);
      console.log("Logg", tournamentData);
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  useEffect(() => {
    // if (tournamentId) {
    //   console.log("Received Tournament ID:", tournamentId);
    //   // Fetch the tournament details using the ID
    // }
    fetchTournamentData();
  }, []);

  return (
    <div className="overview-page">
      <h1>Overview</h1>
      <div className="overview-container">
        {/* Main Card */}
        {/* <div className="main-card">
          <div className="header">
            <h2>test</h2>
            <p>League Of Legends</p>
            <button className="draft-button">Draft</button>
          </div>
          <div className="status-tabs">
            <span className="status active">SETUP</span>
            <span className="status">PENDING</span>
            <span className="status">RUNNING</span>
          </div>
          <p className="status-message">
            You should wait for participants to register and then choose to
            accept or refuse them.
          </p>
        </div> */}

        <div className="main-card">
          <div className="header">
            <h2>{tournamentData ? tournamentData.name : "Tournament Name"}</h2>
            <p>
              {tournamentData && tournamentData.game
                ? tournamentData.game.name
                : "Game Name"}
            </p>
            <button className="draft-button">Draft</button>
          </div>
          <div className="status-tabs">
            <span className="status active">SETUP</span>
            <span className="status">PENDING</span>
            <span className="status">RUNNING</span>
          </div>
          <p className="status-message">
            You should wait for participants to register and then choose to
            accept or refuse them.
          </p>
        </div>

        {/* Participants Card */}
        <div className="card participants-card">
          <div className="card-header">
            <h3>Participants</h3>
            <a href="#" className="add-link">
              + Add
            </a>
          </div>
          <div className="card-content">
            <p className="count">
              0 <span>Participants</span>
            </p>
            <p className="count">
              2 <span>Tournament size</span>
            </p>
          </div>
          <a href="#" className="configure-checkin">
            Configure check-in
          </a>
        </div>

        {/* Structure Card */}
        <div className="card structure-card">
          <div className="card-header">
            <h3>Structure</h3>
            <a href="#" className="create-stage-link">
              + Create new stage
            </a>
          </div>
          <p>1. Bracket groups</p>
          <p className="structure-details">0/3 players Pending</p>
          <a href="#" className="view-stages-link">
            View all stages
          </a>
        </div>

        {/* Registrations Card */}
        <div className="card registrations-card">
          <h3>Registrations</h3>
          <div className="registration-status">
            <span>
              0 <span className="status-text">Pending</span>
            </span>
            <span>
              0 <span className="status-text accepted">Accepted</span>
            </span>
            <span>
              0 <span className="status-text refused">Refused</span>
            </span>
            <span>
              0 <span className="status-text cancelled">Cancelled</span>
            </span>
          </div>
          <p className="no-registrations">No pending registrations</p>
        </div>
      </div>

      {/* Public Page Button */}
      <button className="public-page-button">Public page</button>
    </div>
  );
};

export default Overview;
