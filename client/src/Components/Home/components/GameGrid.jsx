import { useState, useEffect } from 'react';
import GameCard from './GameCard';
import styles from '../styles/GameGrid.module.css'; 

const GameGrid = () => {
  const [gameData, setGameData] = useState([]);

  // Fetch game data
  const fetchGameData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/client/game/getAllGame`);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGameData(data);
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  return (
    <div className={styles.gameGrid}>
      {gameData.map((game) => (
        <GameCard key={game._id} name={game.name} image={game.image} game={game} />
      ))}
    </div>
  );
};

export default GameGrid;
