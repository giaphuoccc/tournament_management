import React, { useState, useEffect } from "react";
import "../styles/CreateTournament.css";
import axios from "axios";

export default function Organizer_id() {
  const id = "67403ad1d720d2d590d3494e";
  const [formData, setFormData] = useState({
    tournamentId: "",
  });

  const deleteTournament = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/client/tournament/deleteTournamentById/6740392dd720d2d590d34949`
      );
      console.log(response.data.message); // Log success message

      // Update state to remove the deleted tournament
      // setTournaments(tournaments.filter((tournament) => tournament._id !== id));
    } catch (error) {
      console.error("Error deleting tournament:", error);
      alert("Failed to delete tournament");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="create-tournament">
      <h1>Enter Your Tournament ID</h1>

      <div className="form-container">
        {/* <h2>Step 1: Basic Info</h2> */}
        <label>Organizer Name (maximum 30 characters)</label>
        <input
          type="text"
          name="tournamentId"
          maxLength={30}
          value={formData.tournamentId}
          onChange={handleChange}
        />
      </div>

      <button onClick={deleteTournament}>Delete</button>
    </div>
  );
}
