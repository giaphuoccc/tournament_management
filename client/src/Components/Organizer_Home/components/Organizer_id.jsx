import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateTournament.css";
import axios from "axios";

export default function OrganizerId() {
  const [tournamentId, setTournamentId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (tournamentId.trim()) {
      navigate("/overview-tournament", { state: { tournamentId } });
    } else {
      alert("Please enter a valid ID");
    }
  };

  return (
    <div className="create-tournament">
      <h1>Enter Your Tournament ID</h1>
      <div className="form-container">
        <label>Tournament ID (maximum 30 characters)</label>
        <input
          type="text"
          maxLength={30}
          value={tournamentId}
          onChange={(e) => setTournamentId(e.target.value)}
          placeholder="Enter tournament ID"
        />
        <button className="create-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
