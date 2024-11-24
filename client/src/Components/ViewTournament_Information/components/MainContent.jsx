import React from "react";
import TournamentMenu from "./MenuView";
import TourDescription from "./TourDescription";
import TournamentSidebar from "./TournamentSidebar";
import styles from "../styles/TournamentView.module.css";

function MainContent() {
  return (
    <main className={styles.mainContent}>
      <TournamentMenu />
      <div className={styles.contentWrapper}>
        <TourDescription />
        <TournamentSidebar />
      </div>
    </main>
  );
}

export default MainContent;
