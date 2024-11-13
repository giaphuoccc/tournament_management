import React, { useState } from "react";
import "../styles/CreateTournament.css";
import location from "../data/LocationData";

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
    description: "",
    rules: "",
  });

  const disciplines = [
    "League of Legends",
    "FC24",
    "Mobile Legends",
    "Valorant",
    "eFootball",
    "Rocket League",
  ];

  const participants = ["8 Teams", "16 Teams"];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData.timeStarted);
  };

  // const handlePlatformSelect = (platform) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     platforms: prevData.platforms.includes(platform)
  //       ? prevData.platforms.filter((p) => p !== platform)
  //       : [...prevData.platforms, platform],
  //   }));
  // };

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
      if (formData.participant.length == 0) {
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

    if (step === 4) {
      // Check if endTime is before startTime
      const startTime = new Date(formData.timeStarted);
      const endTime = new Date(formData.timeEnded);

      if (!formData.description.trim()) {
        alert("Please enter a description to proceed.");
        return;
      }
      if (!formData.rules.trim()) {
        alert("Please select a rules to proceed.");
        return;
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
            <h2>Step 2: Participants</h2>
            <label>Number of team (s)</label>
            <div className="participant-grid">
              {participants.map((participant, index) => (
                <div
                  key={index}
                  className={`participant-item ${
                    formData.participant === participant ? "selected" : ""
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, participant: participant })
                  }
                >
                  {participant}
                </div>
              ))}
            </div>

            {/* <label>Number of Participants</label>
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
            </div> */}

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
        )}

        {step === 5 && (
          <div className="form-container">
            <h2>Step 5: Review Information</h2>
            <label>Description</label>

            <div className="review-info-container">
              <h3>Review Information</h3>
              <ul>
                <li>
                  <strong>Tournament Name:</strong> {formData.tournamentName}
                </li>
                <li>
                  <strong>Discipline:</strong> {formData.discipline}
                </li>
                <li>
                  <strong>Participants:</strong> {formData.participant}
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
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateTournament;
