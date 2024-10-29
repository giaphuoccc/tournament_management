import React from "react";
import Sidebar from "./Sidebar";
import Create_Tournament from "./Create_Tournament";
import Overview from "./Overview";

import "../styles/organizer.css";

export default function Organizer() {
  return (
    <div className="app">
      <Sidebar />
      <Create_Tournament />
    </div>
  );
}

export function OverviewConplete() {
  return (
    <div className="app">
      <Sidebar />
      <Overview />
    </div>
  );
}
