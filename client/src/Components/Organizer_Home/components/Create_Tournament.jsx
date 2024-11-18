import React, { useState, useEffect } from "react";
import "../styles/CreateTournament.css";
import location from "../data/LocationData";
import axios from "axios";

const CreateTournament = () => {
  const [gameData, setGameData] = useState([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", // Matches 'name' field in schema (required)
    organizer: "Tuo", // Matches 'organizer' field in schema (required)
    regStatus: "open", // Matches 'regStatus', defaulting to 'open' (required, with enum value)
    tournamentSize: "", // Matches 'tournamentSize' field (required, with enum value: "8" or "16")
    location: "", // Matches 'location' field in schema (required)
    timeStarted: "", // Matches 'timeStarted' field in schema (required)
    timeEnded: "", // Matches 'timeEnded' field in schema (required)
    image: "", // Matches 'image' field in schema (optional)
    gameId: "", // Matches 'game' field in schema, expects ObjectId reference (optional)
  });

  const tournamentSize = ["8", "16"];

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
        alert("End h");
        return; // Prevent moving to submission if the dates are invalid
      }
    }

    // if (step === 4) {
    //   // Check if endTime is before startTime
    //   const startTime = new Date(formData.timeStarted);
    //   const endTime = new Date(formData.timeEnded);

    //   if (!formData.description.trim()) {
    //     alert("Please enter a description to proceed.");
    //     return;
    //   }
    //   if (!formData.rules.trim()) {
    //     alert("Please select a rules to proceed.");
    //     return;
    //   }
    // }

    setStep((prevStep) => prevStep + 1); // Move to the next step if validation passes
  };
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
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
      console.log("Response:", response.data);
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
                <option key={country.code} value={country.code}>
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

        {/* {step === 4 && (
          <div className="form-container">
            <h2>Step 4: Tournament Description & Rules</h2>
            <label>Description</label>
            <textarea
              rows={5} // Specifies the number of visible text lines
              cols={30} // Specifies the width of the textarea in characters
              value={formData.description}
              placeholder="Add your text" // Specifies a short hint that describes the expected value of the textarea
              wrap="soft" // Specifies how the text in the textarea should be wrapped
              readOnly={false} // Specifies that the textarea is read-only, meaning the user cannot modify its content
              name="description" // Specifies the name of the textarea, which can be used when submitting a form
              disabled={false} //  Specifies that the textarea is disabled, meaning the user cannot interact with it
              onChange={handleChange}
            />

            <label>Rules</label>
            <textarea
              rows={5} // Specifies the number of visible text lines
              cols={30} // Specifies the width of the textarea in characters
              value={formData.rules}
              placeholder="Add your text" // Specifies a short hint that describes the expected value of the textarea
              wrap="soft" // Specifies how the text in the textarea should be wrapped
              readOnly={false} // Specifies that the textarea is read-only, meaning the user cannot modify its content
              name="rules" // Specifies the name of the textarea, which can be used when submitting a form
              disabled={false} //  Specifies that the textarea is disabled, meaning the user cannot interact with it
              onChange={handleChange}
            />

            <button className="back-button" type="button" onClick={prevStep}>
              Back
            </button>
            <button className="next-button" type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        )} */}

        {step === 4 && (
          <div className="form-container">
            <h2>Step 5: Review Information</h2>
            <label>Description</label>

            <div className="review-info-container">
              <h3>Review Information</h3>
              <ul>
                <li>
                  <strong>Tournament Name:</strong> {formData.name}
                </li>
                <li>
                  <strong>Discipline:</strong>{" "}
                  {/* {selectedGame ? selectedGame.name : "No discipline selected"} */}
                </li>
                <li>
                  <strong>Participants:</strong> {formData.tournamentSize}
                </li>
                <li>
                  <strong>Timezone:</strong> {formData.timezone}
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
            <button onClick={handleSubmit}>Submit Tournament</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateTournament;
