import React from "react";
import styles from "../styles/TournamentView.module.css";

function TournamentInfo() {
  return (
    <section className={styles.tournamentInfoSection}>
      <div className={styles.backgroundContainer}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fb0e55c55f17b7fd2e0d9b0b72e2c0c8c052e339ce989865e941c979972c85d1?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff"
          alt=""
          className={styles.backgroundImage}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/02c4a5e70259c140a9f67c94329cf4172004aad525494f813869eecd809c114c?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff"
          alt="Tournament logo"
          className={styles.tournamentLogo}
        />
      </div>
      <div className={styles.tournamentDetails}>
        <h2 className={styles.tournamentTitle}>Consort Cup - LOL</h2>
        <p className={styles.tournamentMeta}>
          <span className={styles.gameInfo}>League Of Legends - PC</span>
          <span className={styles.dateInfo}>
            October 3, 2024 - October 10, 2024
          </span>
          <br />
          <span className={styles.organizer}>By Consort</span>
          <br />
          <span className={styles.location}>Online</span>
        </p>
      </div>
    </section>
  );
}

export default TournamentInfo;
