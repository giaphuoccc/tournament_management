import React from "react";
import styles from "../styles/TournamentView.module.css";

function TourDescription({ description, tournamentSize }) {
  return (
    <section className={styles.descriptionSection}>
      <h3 className={styles.sectionTitle}>Description</h3>
      {/* Hiển thị mô tả giải đấu */}
      <p className={styles.descriptionText}>{description}</p>
      <div className={styles.playoffsSection}>
        <h4 className={styles.playoffsTitle}>Number of Teams</h4>
        {/* Hiển thị số lượng đội từ props */}
        <p className={styles.playoffsText}>
          {tournamentSize ? `${tournamentSize} Teams` : "Loading..."}
        </p>
      </div>
    </section>
  );
}

export default TourDescription;
