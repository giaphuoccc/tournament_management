import styles from "../styles/GameCard.module.css";

const GameCard = ({ name, image }) => {
  return (
    <div className={styles.gameCard}>
      <img src={image} alt={`${name} cover`} className={styles.gameImage} />
      <h3 className={styles.gameName}>{name}</h3>
    </div>
  );
};

export default GameCard;