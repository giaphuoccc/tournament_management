import React from "react";
import styles from "../styles/TournamentView.module.css";

function MenuView({ activeTab, setActiveTab }) {
  const menuItems = ["Information", "Matches", "Participants", "Rules"];

  return (
    <nav className={styles.menuView}>
      <ul className={styles.menuList}>
        {menuItems.map((item, index) => (
          <li key={index} className={styles.menuItem}>
            <button
              className={`${styles.menuLink} ${
                activeTab === item.toLowerCase() ? styles.active : ""
              }`}
              onClick={() => setActiveTab(item.toLowerCase())}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MenuView;
