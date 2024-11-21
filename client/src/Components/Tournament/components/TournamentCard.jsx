//import React from "react";
import styles from "../styles/TournamentCard.module.css";
import { format } from "date-fns";

const TournamentCard = ({
  name,
  organizer,
  regStatus,
  tournamentSize,
  location,
  timeStarted,
  timeEnded,
  image,
}) => {
  // Format the dates using date-fns
  const formattedTimeStarted = format(new Date(timeStarted), "MMMM d, yyyy");
  const formattedTimeEnded = format(new Date(timeEnded), "MMMM d, yyyy");

  const formattedDateRange = `${formattedTimeStarted} - ${formattedTimeEnded}`;

  return (
    <article className={styles.tournamentCard}>
      <img src={image} alt={`${name} logo`} className={styles.tournamentLogo} />
      <div className={styles.tournamentInfo}>
        <h2 className={styles.tournamentTitle}>{name}</h2>
        <p className={styles.tournamentOrganizer}>
          League Of Legends(PC) - By {organizer}
        </p>
      </div>
      <div className={styles.tournamentDetails}>
        <p className={styles.tournamentDate}>{formattedDateRange}</p>
        <p className={styles.tournamentLocation}>{location}</p>
        <p className={styles.tournamentTeams}>{tournamentSize} Teams</p>

        {regStatus && (
          <p
            className={`${styles.tournamentStatus} ${
              styles[regStatus.toLowerCase().replace(" ", "")]
            }`}
          >
            {regStatus}
          </p>
        )}
      </div>
    </article>
  );
};

export default TournamentCard;
