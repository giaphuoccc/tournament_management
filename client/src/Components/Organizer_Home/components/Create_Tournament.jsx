import React, { useState } from "react";
import "../styles/CreateTournament.css";

const Create_Tournament = () => {
  const [tournamentName, setTournamentName] = useState("");
  const [participant, setParticipant] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [participantType, setParticipantType] = useState("Players");
  const [timezone, setTimezone] = useState("(UTC-11:00) - Niue - Niue");

  // Array of disciplines and platforms (sample data)
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

  const handlePlatformSelect = (platform) => {
    setPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="create-tournament">
      <h1>Create new tournament</h1>
      <div className="form-container">
        <label>Tournament name (maximum 30 characters)</label>
        <input
          type="text"
          value={tournamentName}
          maxLength={30}
          onChange={(e) => setTournamentName(e.target.value)}
        />

        <label>Discipline</label>
        <div className="discipline-grid">
          {disciplines.map((game, index) => (
            <div
              key={index}
              className={`discipline-item ${
                discipline === game ? "selected" : ""
              }`}
              onClick={() => setDiscipline(game)}
            >
              {game}
            </div>
          ))}
        </div>

        <label>Platform(s)</label>
        <div className="platform-grid">
          {platformOptions.map((platform, index) => (
            <div
              key={index}
              className={`platform-item ${
                platforms.includes(platform) ? "selected" : ""
              }`}
              onClick={() => handlePlatformSelect(platform)}
            >
              {platform}
            </div>
          ))}
          <div className="platform-item">+ Others</div>
        </div>

        <label>Participants</label>
        <div className="participants_container">
          <input
            type="number"
            className="participants_input"
            value={participant}
            maxLength={3}
            onChange={(e) => setParticipant(e.target.value)}
          />
          <div className="participant-options">
            <label>
              <input
                type="radio"
                value="Players"
                checked={participantType === "Players"}
                onChange={() => setParticipantType("Players")}
              />
              Players
            </label>
            <label>
              <input
                type="radio"
                value="Teams"
                checked={participantType === "Teams"}
                onChange={() => setParticipantType("Teams")}
              />
              Teams
            </label>
          </div>
        </div>

        <label>Timezone</label>
        <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
          <option>(UTC+7:00) - Hanoi - Vietnam</option>
          {/* Add more timezone options as needed */}
        </select>

        <button className="create-button">+ Create</button>
      </div>
    </div>
  );
};

export default Create_Tournament;
