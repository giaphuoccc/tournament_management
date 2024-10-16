//import React from "react";
import TournamentList from "./components/TournamentList";
import styles from "./styles/TournamentPage.module.css";

const TournamentPage = () => {
  return (
    <div className={styles.tournamentPage}>
      <main className={styles.mainContent}>
        <section className={styles.heroSection}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fb0e55c55f17b7fd2e0d9b0b72e2c0c8c052e339ce989865e941c979972c85d1?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff"
            alt=""
            className={styles.heroBackground}
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/02c4a5e70259c140a9f67c94329cf4172004aad525494f813869eecd809c114c?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff"
            alt="Tournament logo"
            className={styles.heroLogo}
          />
        </section>
        <section className={styles.tournamentSection}>
          <h1 className={styles.sectionTitle}>TOURNAMENTS</h1>
          <nav className={styles.tournamentNav}>
            <ul className={styles.navList}>
              <li>Past</li>
              <li className={styles.active}>
                Ongoing
                <div className={styles.activeIndicator} />
              </li>
              <li>Upcoming</li>
            </ul>
          </nav>
          <TournamentList />
        </section>
      </main>
    </div>
  );
};

export default TournamentPage;

