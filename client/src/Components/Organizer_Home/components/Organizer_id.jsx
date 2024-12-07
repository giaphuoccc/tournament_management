import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/CreateTournament.css";

export default function OrganizerId() {
  const [tournamentId, setTournamentId] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchAllTournament = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/client/tournament/getAllTournaments`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setData(data);

      // Log the fetched data for debugging
      console.log("Fetched tournament data:", data);
    } catch (error) {
      console.error("Error fetching tournament data", error);
    }
  };

  const handleSubmit = () => {
    // Check if the input ID matches any tournament in the data
    const matchedTournament = data.find(
      (tournament) => tournament._id === tournamentId
    );

    // If no match, show an alert and stop execution
    if (!matchedTournament) {
      alert("The entered tournament ID does not match.");
      return;
    }

    // Check if tournamentId is valid (non-empty)
    if (!tournamentId.trim()) {
      alert("Please enter a valid ID.");
      return;
    }

    // Navigate to the overview page with the tournament ID
    navigate("/overview-tournament", { state: { tournamentId } });
  };

  useEffect(() => {
    fetchAllTournament();
  }, []);

  return (
    <div className="create-tournament">
      <h1>Enter Your Tournament ID</h1>
      <div className="form-container">
        <label>Tournament ID </label>
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
        <Link to="/create-tournament">
          <button className="next-button">Create New Tournament</button>
        </Link>
      </div>
    </div>
  );
}
