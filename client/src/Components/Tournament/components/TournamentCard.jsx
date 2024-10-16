//import React from "react";
import styles from "../styles/TournamentCard.module.css";

const TournamentCard = ({
  image,
  title,
  organizer,
  date,
  location,
  teams,
  status,
}) => {
  return (
    <article className={styles.tournamentCard}>
      <img
        src={image}
        alt={`${title} logo`}
        className={styles.tournamentLogo}
      />
      <div className={styles.tournamentInfo}>
        <h2 className={styles.tournamentTitle}>{title}</h2>
        <p className={styles.tournamentOrganizer}>
          League Of Legends(PC) - By {organizer}
        </p>
      </div>
      <div className={styles.tournamentDetails}>
        <p className={styles.tournamentDate}>{date}</p>
        <p className={styles.tournamentLocation}>{location}</p>
        <p className={styles.tournamentTeams}>{teams} Teams</p>
        {status && (
          <p
            className={`${styles.tournamentStatus} ${
              styles[status.toLowerCase().replace(" ", "")]
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </article>
  );
};

export default TournamentCard;
