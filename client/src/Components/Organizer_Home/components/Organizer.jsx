import React from "react";
import Sidebar from "./Sidebar";
import Create_Tournament from "./Create_Tournament";

import "../styles/organizer.css";

export default function Organizer() {
  return (
    <div className="app">
      <Sidebar />
      <Create_Tournament />
    </div>
  );
}
