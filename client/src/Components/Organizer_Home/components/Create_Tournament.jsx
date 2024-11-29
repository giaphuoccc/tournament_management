import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateTournament.css";
import location from "../data/LocationData";
import axios from "axios";

const CreateTournament = () => {
  const [gameData, setGameData] = useState([]);
  const [step, setStep] = useState(1);
  const [tourID, setTourID] = useState("");
  const [formData, setFormData] = useState({
    name: "", // Matches 'name' field in schema (required)
    organizer: "", // Matches 'organizer' field in schema (required)
    regStatus: "open", // Matches 'regStatus', defaulting to 'open' (required, with enum value)
    tournamentSize: "", // Matches 'tournamentSize' field (required, with enum value: "8" or "16")
    location: "", // Matches 'location' field in schema (required)
    timeStarted: "", // Matches 'timeStarted' field in schema (required)
    timeEnded: "", // Matches 'timeEnded' field in schema (required)
    image: "https://picsum.photos/200", // Matches 'image' field in schema (optional)
    rules: "",
    prize: "",
    description: "",
    gameId: "", // Matches 'game' field in schema, expects ObjectId reference (optional)
  });

  const tournamentSize = ["8", "16"];
  const navigate = useNavigate();

  const fetchGameData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/client/game/getAllGame`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGameData(data); // Set fetched data to state
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  useEffect(() => {
    fetchGameData(); // Fetch game data on component mount
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const nextStep = () => {
    if (step === 1) {
      // Check if tournamentName and discipline are not empty
      if (!formData.name.trim()) {
        alert("Please enter a tournament name to proceed.");
        return;
      }
      if (!formData.gameId) {
        alert("Please select a discipline to proceed.");
        return;
      }
    }

    if (step === 2) {
      // Check if tournamentName and discipline are not empty
      if (formData.tournamentSize.length == 0) {
        alert("Please select a platform to proceed.");
        return;
      }
    }

    if (step === 3) {
      // Check if endTime is before startTime
      const startTime = new Date(formData.timeStarted);
      const endTime = new Date(formData.timeEnded);

      if (endTime < startTime) {
        alert("End time cannot be before start time.");
        return; // Prevent moving to submission if the dates are invalid
      }

      if (!formData.location.trim()) {
        alert("Please Choose Location");
        return; // Prevent moving to submission if the dates are invalid
      }
    }

    setStep((prevStep) => prevStep + 1); // Move to the next step if validation passes
  };
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/client/tournament/createTournament",
        formData, // `game` is included in `formData`
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const createdTournamentId = response.data._id;

      setTourID(createdTournamentId);

      // Navigate to /overview-tournament and pass the ID
      // navigate("/overview-tournament", {
      //   state: { tournamentId: createdTournamentId },
      // });

      setStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.error("Error submitting tournament:", error);

      let errorMessage = "An error occurred while submitting the tournament.";

      if (error.response) {
        // If there is an error response from the server, use that message
        errorMessage = error.response.data.message || errorMessage;
        console.error("Server response:", error.response.data);
      }

      // Alert the user about the error
      alert(errorMessage);
    }
  };

  return (
    <div className="create-tournament">
      <h1>Create New Tournament</h1>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-container">
            <h2>Step 1: Basic Info</h2>
            <label>Organizer Name (maximum 30 characters)</label>
            <input
              type="text"
              name="organizer"
              maxLength={30}
              value={formData.organizer}
              onChange={handleChange}
            />

            <label>Tournament Name (maximum 30 characters)</label>
            <input
              type="text"
              name="name"
              maxLength={30}
              value={formData.name}
              onChange={handleChange}
            />
            <label>Discipline</label>

            <div className="discipline-grid">
              {gameData.length === 0 ? (
                <p>No games available</p>
              ) : (
                gameData.map((game) => (
                  <div
                    key={game._id}
                    className={`discipline-item ${
                      formData.gameId === game._id ? "selected" : ""
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, gameId: game._id })
                    }
                  >
                    {game.name}
                  </div>
                ))
              )}
            </div>

            <label>Tournament Prize (Optional) </label>
            <input
              type="number"
              name="prize"
              // maxLength={30}
              value={formData.prize}
              onChange={handleChange}
            />
            <br></br>
            <button className="next-button" type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="form-container">
            <h2>Step 2: Participants</h2>
            <label>Number of team (s)</label>
            <div className="participant-grid">
              {tournamentSize.map((tournamentSize, index) => (
                <div
                  key={index}
                  className={`participant-item ${
                    formData.tournamentSize === tournamentSize ? "selected" : ""
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, tournamentSize: tournamentSize })
                  }
                >
                  {tournamentSize}
                </div>
              ))}
            </div>

            <div className="button-group">
              <button className="back-button" type="button" onClick={prevStep}>
                Back
              </button>
              <button className="next-button" type="button" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-container">
            <h2>Step 3: Time & Location</h2>

            <label>Timezone</label>
            <select
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
            >
              <option value="(UTC+7:00) - Hanoi - Vietnam">
                (UTC+7:00) - Hanoi - Vietnam
              </option>
              <option value="(UTC-11:00) - Niue - Niue">
                (UTC-11:00) - Niue - Niue
              </option>
              {/* Add more timezone options as needed */}
            </select>

            <label>Start Time</label>
            <input
              type="datetime-local"
              name="timeStarted"
              maxLength={30}
              value={formData.timeStarted}
              onChange={handleChange}
            />

            <label>End Time</label>
            <input
              type="datetime-local"
              name="timeEnded"
              maxLength={30}
              value={formData.timeEnded}
              onChange={handleChange}
            />

            {/* New Location Selector */}
            <label>Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
            >
              <option value="">Select a country</option>
              {location.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>

            <div className="button-group">
              <button className="back-button" type="button" onClick={prevStep}>
                Back
              </button>
              <button className="next-button" type="button" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="form-container">
            <h2>Step 4: Tournament Description & Rules</h2>
            <label>Description</label>
            <textarea
              rows={5}
              cols={30}
              value={formData.description}
              placeholder="Add your text"
              wrap="soft"
              name="description"
              onChange={handleChange} // Correctly updates 'description'
            />

            <label>Rules</label>
            <textarea
              rows={5}
              cols={30}
              value={formData.rules}
              placeholder="Add your text"
              wrap="soft"
              name="rules"
              onChange={handleChange} // Correctly updates 'rules'
            />

            <button className="back-button" type="button" onClick={prevStep}>
              Back
            </button>
            <button className="next-button" type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="form-container review-step">
            <h2 className="step-title">
              📋 Step 5: Review Your Tournament Details
            </h2>

            <div className="review-info-container">
              <h3 className="review-title">
                Please confirm the information below:
              </h3>
              <ul className="info-list">
                <li>
                  <strong>Organizer:</strong> {formData.organizer}
                </li>
                <li>
                  <strong>Tournament Name:</strong> {formData.name}
                </li>
                <li>
                  <strong>Discipline:</strong>{" "}
                  {gameData.find((game) => game._id === formData.gameId)
                    ?.name || "Discipline not selected"}
                </li>
                <li>
                  <strong>Participants:</strong> {formData.tournamentSize}
                </li>
                <li>
                  <strong>Start Date:</strong> {formData.timeStarted}
                </li>
                <li>
                  <strong>End Date:</strong> {formData.timeEnded}
                </li>
                <li>
                  <strong>Location:</strong> {formData.location}
                </li>
                <li>
                  <strong>Description:</strong> {formData.description}
                </li>
                <li>
                  <strong>Rules:</strong> {formData.rules}
                </li>
              </ul>
            </div>

            <button className="back-button" type="button" onClick={prevStep}>
              Back
            </button>
            <button
              className="create-button"
              type="button"
              onClick={handleSubmit}
            >
              Create Tournament
            </button>
          </div>
        )}

        {step === 6 && (
          <div className="form-container final-step">
            <div className="tournament-id-container">
              <h1 className="title">🎉 Your Tournament Has Been Created! 🎉</h1>
              <p className="subtitle">
                Keep your Tournament ID safe for future updates or management.
              </p>
              <div className="id-box">
                <p className="label">Tournament ID:</p>
                <h2 className="tournament-id">{tourID}</h2>
              </div>
              <p className="note">
                You’ll need this ID to edit or delete your tournament in the
                future.
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateTournament;
