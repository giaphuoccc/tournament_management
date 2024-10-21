import styles from "../styles/GameCard.module.css";
import { useNavigate } from "react-router-dom";

const GameCard = ({ name, image, game }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(`Clicked on ${name}`);
    navigate(`/client/tournament/${game._id}`);
  };

  return (
    <div className={styles.gameCard} onClick={handleClick}>
      <img src={image} alt={`${name} cover`} className={styles.gameImage} />
      <h3 className={styles.gameName}>{name}</h3>
    </div>
  );
};

export default GameCard;