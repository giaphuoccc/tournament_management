import React from "react";
import Sidebar from "./Sidebar";
// import Create_Tournament from "./Create_Tournament";
import CreateTournament from "./Create_Tournament";
import Overview from "./Overview";
import Organizer_id from "./Organizer_id";

import "../styles/organizer.css";

export default function Organizer() {
  return (
    <div className="app">
      <Sidebar />
      <CreateTournament />
    </div>
  );
}

export function OrganizerOverview() {
  return (
    <div className="app">
      <Sidebar />
      <Overview />
    </div>
  );
}

export function OrganizerID() {
  return (
    <div className="app">
      <Sidebar />
      <Organizer_id />
    </div>
  );
}
