import React from "react";
import "../styles/sidebar.css";

const Sidebar = () => (
  <div className="sidebar">
    <h2>Organizer</h2>
    <div className="menu">
      <p>Overview</p>
      <p>Tournaments</p>
      <p>Circuits</p>
      <p>Websites</p>
      <p>Subscription</p>
      <p>Billing</p>
      <p>Permissions</p>
      <p>Settings</p>
    </div>
    <div className="sidebar-footer">
      <p>Support</p>
      <p>Language</p>
      <p>Tuo Bui</p>
    </div>
  </div>
);

export default Sidebar;
