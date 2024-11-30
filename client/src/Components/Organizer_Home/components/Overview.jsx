import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/OverviewPage.css";
import axios from "axios";
import locationData from "../data/LocationData"; // Import dữ liệu Location

const Overview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tournamentData, setTournamentData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const { tournamentId } = location.state || {}; // Nhận tournamentId từ state
  // const tournamentId = "673dd3b77147a381671f2a49"; // ID giải đấu

  const countries = ["All", ...locationData.map((loc) => loc.name)];

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
      setEditedData(data); // Khởi tạo dữ liệu chỉnh sửa
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  useEffect(() => {
    if (tournamentId) {
      fetchTournamentData();
    }
  }, [tournamentId]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = (key, value) => {
    setEditedData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/client/tournament/updateTournamentById/${tournamentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedTournament = await response.json();
      setTournamentData(updatedTournament);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating tournament:", error);
    }
  };

  const handleDelete = async () => {
    if (confirmationText !== tournamentData.name) {
      alert("The entered tournament name does not match.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/client/tournament/deleteTournamentById/${tournamentId}`
      );

      if (response.status === 200) {
        alert("Tournament deleted successfully!");
        navigate("/organizer");
      }
    } catch (error) {
      console.error("Error deleting tournament:", error);
      alert("Failed to delete tournament");
    }
  };

  return (
    <div className="overview-page">
      <h1>Overview</h1>

      <button
        className="public-page-button"
        onClick={isEditing ? handleSave : handleEditToggle}
      >
        {isEditing ? "Save" : "Update"}
      </button>
      <button className="delete-page-button" onClick={() => setShowModal(true)}>
        Delete This Tournament
      </button>

      <div className="overview-container">
        {/* Information Card */}
        <div className="main-card">
          <h2>Information</h2>
          <div className="contentInformation">
            <p className="smallTitle">Name Tournament:</p>
            {isEditing ? (
              <input
                type="text"
                value={editedData.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            ) : (
              <p>{tournamentData.name || "Tournament Name"}</p>
            )}
            <p className="nameGame">
              {tournamentData.game?.name || "Game Name"}
            </p>
          </div>
          <div>
            <p className="smallTitle">Organizer:</p>
            {isEditing ? (
              <input
                type="text"
                value={editedData.organizer || ""}
                onChange={(e) => handleInputChange("organizer", e.target.value)}
              />
            ) : (
              <p>{tournamentData.organizer || "Organizer Name"}</p>
            )}
          </div>
        </div>

        {/* Location & Time Card */}
        <div className="main-card">
          <h2>Location</h2>
          {isEditing ? (
            <select
              value={editedData.location || ""}
              onChange={(e) => handleInputChange("location", e.target.value)}
            >
              <option value="" disabled>
                Select a country
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          ) : (
            <p>{tournamentData.location || "Location Name"}</p>
          )}
          <h2>Time</h2>
          <p>
            Start:{" "}
            {isEditing ? (
              <input
                type="datetime-local"
                value={
                  editedData.timeStarted
                    ? new Date(editedData.timeStarted)
                        .toISOString()
                        .slice(0, 16)
                    : ""
                }
                onChange={(e) =>
                  handleInputChange("timeStarted", e.target.value)
                }
              />
            ) : (
              new Date(tournamentData.timeStarted).toLocaleDateString("en-GB")
            )}
          </p>
          <p>
            End:{" "}
            {isEditing ? (
              <input
                type="datetime-local"
                value={
                  editedData.timeEnded
                    ? new Date(editedData.timeEnded).toISOString().slice(0, 16)
                    : ""
                }
                onChange={(e) => handleInputChange("timeEnded", e.target.value)}
              />
            ) : (
              new Date(tournamentData.timeEnded).toLocaleDateString("en-GB")
            )}
          </p>
        </div>

        {/* Rules Card */}
        <div className="main-card">
          <h2>Rules</h2>
          {isEditing ? (
            <textarea
              value={editedData.rules || ""}
              onChange={(e) => handleInputChange("rules", e.target.value)}
            />
          ) : (
            <p>{tournamentData.rules || "Rules"}</p>
          )}
        </div>

        {/* Description Card */}
        <div className="main-card">
          <h2>Description</h2>
          {isEditing ? (
            <textarea
              value={editedData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          ) : (
            <p>{tournamentData.description || "Description"}</p>
          )}
        </div>
      </div>

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
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
