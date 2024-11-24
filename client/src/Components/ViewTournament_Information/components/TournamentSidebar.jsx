import React from "react";
import styles from "../styles/TournamentView.module.css";

function TournamentSidebar({ regStatus, timeStarted, timeEnded }) {
  return (
    <aside className={styles.tournamentDetails}>
      <div className={styles.detailsSection}>
        <h4 className={styles.detailsTitle}>Time of Tournament</h4>
        <p className={styles.detailsText}>
          Start Time: {timeStarted ? new Date(timeStarted).toLocaleString() : "Loading..."}
        </p>
        <br></br>
        <p className={styles.detailsText}>
          End Time: {timeEnded ? new Date(timeEnded).toLocaleString() : "Loading..."}
        </p>
      </div>
      <div className={styles.detailsSection}>
        <h4 className={styles.detailsTitle}>Registration</h4>
        <p className={styles.detailsText}>
          Status: {regStatus || "Loading..."}
        </p>
      </div>
    </aside>
  );
}

export default TournamentSidebar;
