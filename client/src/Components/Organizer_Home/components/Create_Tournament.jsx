import React, { useState } from "react";
import "../styles/CreateTournament.css";

const CreateTournament = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tournamentName: "",
    participant: "",
    discipline: "",
    platforms: [],
    participantType: "Players",
    timezone: "(UTC+7:00) - Hanoi - Vietnam",
    timeStarted: "",
    timeEnded: "",
    location: "",
  });

  const countryOptions = [
    { name: "Afghanistan", code: "AF" },
    { name: "Åland Islands", code: "AX" },
    { name: "Albania", code: "AL" },
    { name: "Algeria", code: "DZ" },
    { name: "American Samoa", code: "AS" },
    // Add more countries as needed
  ];
  const disciplines = [
    "FC24",
    "League of Legends",
    "Mobile Legends",
    "Valorant",
    "eFootball",
    "Rocket League",
  ];

  const platformOptions = [
    "PC",
    "Playstation 4",
    "Playstation 5",
    "Xbox One",
    "Xbox Series",
    "Switch",
    "Mobile",
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData.timeStarted);
  };

  const handlePlatformSelect = (platform) => {
    setFormData((prevData) => ({
      ...prevData,
      platforms: prevData.platforms.includes(platform)
        ? prevData.platforms.filter((p) => p !== platform)
        : [...prevData.platforms, platform],
    }));
  };

  // Step navigation
  const nextStep = () => {
    if (step === 1) {
      // Check if tournamentName and discipline are not empty
      if (!formData.tournamentName.trim()) {
        alert("Please enter a tournament name to proceed.");
        return;
      }
      if (!formData.discipline) {
        alert("Please select a discipline to proceed.");
        return;
      }
    }

    if (step === 2) {
      // Check if tournamentName and discipline are not empty
      if (formData.platforms.length == 0) {
        alert("Please select a platform to proceed.");
        return;
      }
      if (formData.participant <= 0) {
        alert("Please enter number of partiipant greater than 1 to proceed.");
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

    setStep((prevStep) => prevStep + 1); // Move to the next step if validation passes
  };
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // Add your API submission code here
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
              name="tournamentName"
              maxLength={30}
              value={formData.tournamentName}
              onChange={handleChange}
            />

            <label>Discipline</label>
            <div className="discipline-grid">
              {disciplines.map((game, index) => (
                <div
                  key={index}
                  className={`discipline-item ${
                    formData.discipline === game ? "selected" : ""
                  }`}
                  onClick={() => setFormData({ ...formData, discipline: game })}
                >
                  {game}
                </div>
              ))}
            </div>
            <button className="next-button" type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="form-container">
            <h2>Step 2: Platforms & Participants</h2>
            <label>Platform(s)</label>
            <div className="platform-grid">
              {platformOptions.map((platform, index) => (
                <div
                  key={index}
                  className={`platform-item ${
                    formData.platforms.includes(platform) ? "selected" : ""
                  }`}
                  onClick={() => handlePlatformSelect(platform)}
                >
                  {platform}
                </div>
              ))}
            </div>

            <label>Number of Participants</label>
            <input
              type="number"
              name="participant"
              className="participants_input"
              value={formData.participant}
              onChange={handleChange}
              min="2"
            />

            <div className="participant-options">
              <label>
                <input
                  type="radio"
                  name="participantType"
                  value="Players"
                  checked={formData.participantType === "Players"}
                  onChange={handleChange}
                />
                Players
              </label>
              <label>
                <input
                  type="radio"
                  name="participantType"
                  value="Teams"
                  checked={formData.participantType === "Teams"}
                  onChange={handleChange}
                />
                Teams
              </label>
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

            <label>Time</label>
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

            <input
              type="datetime-local"
              name="timeStarted"
              maxLength={30}
              value={formData.timeStarted}
              onChange={handleChange}
            />

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
              {countryOptions.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>

            {/* <div className="review-info-container">
              <h3>Review Information</h3>
              <ul>
                <li>
                  <strong>Tournament Name:</strong> {formData.tournamentName}
                </li>
                <li>
                  <strong>Discipline:</strong> {formData.discipline}
                </li>
                <li>
                  <strong>Platforms:</strong> {formData.platforms.join(", ")}
                </li>
                <li>
                  <strong>Participants:</strong> {formData.participant}
                </li>
                <li>
                  <strong>Participant Type:</strong> {formData.participantType}
                </li>
                <li>
                  <strong>Timezone:</strong> {formData.timezone}
                </li>
              </ul>
            </div> */}

            <div className="button-group">
              <button className="back-button" type="button" onClick={prevStep}>
                Back
              </button>
              <button
                className="create-button"
                type="submit"
                onClick={nextStep}
              >
                Create Tournament
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="form-container">
            <h2>Step 1: Basic Info</h2>
            <button className="back-button" type="button" onClick={prevStep}>
              Back
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateTournament;
