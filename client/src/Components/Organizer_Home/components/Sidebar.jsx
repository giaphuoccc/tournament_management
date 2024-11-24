import React from "react";
import "../styles/sidebar.css";

const Sidebar = () => (
  <div className="sidebar">
    <h2>Organizer</h2>
    <div className="menu">
      <p>Overview</p>
      <p>Create Tournaments</p>
    </div>
    <div className="sidebar-footer">
      <p>Support</p>
      <p>Language</p>
      <p>Tuo Bui</p>
    </div>
  </div>
);

export default Sidebar;
