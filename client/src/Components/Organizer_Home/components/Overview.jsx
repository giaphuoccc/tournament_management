import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/OverviewPage.css";
import axios from "axios";

const Overview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tournamentData, setTournamentData] = useState([]);
  const { tournamentId } = location.state || {};
  const [showModal, setShowModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  // const { tournamentId } = "673dd3b77147a381671f2a49";

  const fetchTournamentData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/client/tournament/getTournamentByTournamentId/${tournamentId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTournamentData(data);
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

  const handleDelete = async () => {
    if (confirmationText !== tournamentData.name) {
      alert("The entered tournament name does not match.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/client/tournament/deleteTournamentById/${tournamentId}`
      );

      // Check the response status directly (optional, since Axios throws for errors)
      if (response.status === 200) {
        alert("Tournament deleted successfully!");
        navigate("/organizer"); // Redirect to home or any other page after deletion
      }
    } catch (error) {
      console.error("Error deleting tournament:", error);
      alert("Failed to delete tournament");
    }
  };

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
        {/* Information Card */}
        <div className="main-card">
          <div className="mainTiltle">
            <h2>Information</h2>

            <div className="contentInformation">
              <p className="titleContent"> Name Tournamet:</p>

              <div className="nameGame-Tournament">
                <p className="nameTournamet">
                  {tournamentData ? tournamentData.name : "Tournament Name"}
                </p>
                <p className="nameGame">
                  {tournamentData && tournamentData.game
                    ? tournamentData.game.name
                    : "Game Name"}
                </p>
              </div>
            </div>

            <div className="contentOrganizer">
              <p className="titleContent"> Organaizer:</p>

              <div className="nameGame-Tournament">
                <p className="nameTournamet">
                  {tournamentData
                    ? tournamentData.organizer
                    : "Tournament Name"}
                </p>
              </div>
            </div>

            {/* <div className="descriptionTournament">
              <p className="titleContent">Description:</p>
              <p>
                {tournamentData ? tournamentData.description : "Description "}
              </p>
            </div> */}
          </div>
        </div>

        {/* Participants Card */}
        <div className="main-card">
          <div className="mainTitle">
            <h2>Location</h2>
          </div>
          {/* <a href="#" className="add-link">
              + Add
            </a> */}
          <div className="contentLocation">
            <p className="locationName">
              {tournamentData ? tournamentData.location : "Location Name"}
            </p>
          </div>

          <div className="tournamentTime">
            <div className="mainTiltle">
              <h2>Time</h2>
            </div>
            <p className="locationName">
              <span className="titleTime">Time Start: </span>
              {tournamentData
                ? new Date(tournamentData.timeStarted).toLocaleDateString(
                    "en-GB"
                  )
                : "Time Start"}
            </p>

            <p className="locationName">
              <span className="titleTime">Time End: </span>
              {tournamentData
                ? new Date(tournamentData.timeEnded).toLocaleDateString("en-GB")
                : "Time End"}
            </p>
          </div>
        </div>

        {/* Rules - Prize Card */}
        <div className="main-card">
          <div className="mainTitle">
            <h2>Rules</h2>
            <p className="contentRules">
              {tournamentData ? tournamentData.rules : "Rules"}
            </p>
          </div>
        </div>

        {/* Description Card */}
        {/* <div className="card registrations-card">
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
        </div> */}
        <div className="main-card">
          <div className="mainTitle">
            <h2>Description</h2>
            <p className="contentDescription">
              {tournamentData ? tournamentData.description : "Description"}
            </p>
          </div>
        </div>
      </div>

      {/* Public Page Button */}
      <button className="public-page-button">Public page</button>
      <button className="delete-page-button" onClick={() => setShowModal(true)}>
        Delete This Tournament
      </button>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Delete Tournament</h2>
            <p>
              Please type the name of the tournament (
              <strong>{tournamentData.name}</strong>) to confirm deletion:
            </p>
            <input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="Enter tournament name"
            />
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleDelete}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
