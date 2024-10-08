import React from 'react'
import styles from '../../styles/Home.module.css';

const gameData = [
  {
    id: 1,
    name: "League Of Legends",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c4d104452df9e6ca1d6ee13a0a447d62683fa8db5cc091bbb324944ab70a9a35?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
  },
  {
    id: 2,
    name: "Valorant",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/751decea0d83b528473527f0ad250d28c5e9466ff2422f0d0eb15af432f8b7c0?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
  },
  {
    id: 3,
    name: "Counter Strike 2",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/59a44fc42c7f6369b96f8dc6d505828feb8e9b8cc1047000fcbc1cf1e12449a7?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
  },
  {
    id: 4,
    name: "EA FC 24",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/997af51df6ea6c1dc69b6653eaceab6835198695f0dc81000d7844d6f8c5fe7d?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
  },
  {
    id: 5,
    name: "PUBG Mobile",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d3635ec0b2964c072991d99c0852fd9f03726065f7c1f3cba6b8c7be36c359b7?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
  },
  {
    id: 6,
    name: "Free Fire",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/603a81678c0924a044145d42a1c0c27de387f3650cd7cbd61e11625529d05586?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
  },
  {
    id: 7,
    name: "Teamfight Tactics",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/02c155897807599a9318a19f1a8c97e7c93c2f9d822a81bdd0715497e499d6cb?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
  },
  {
    id: 8,
    name: "Apex Legends",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4e6e759398c5dffe7ab33731e5b3d8b598538ce30d1cedb1279e4bcd68ff34f4?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
  },
  {
    id: 9,
    name: "LOL: Wild Rift",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d93ec7b90f81f6a46b3ed4dc35a5f45ec7912410a66b58290da1fe619311761c?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
  },
  {
    id: 10,
    name: "Arena Of Valor",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b98695a5dbd99a8b4d97e1c5f08213bb80e12877d2fbf6ab3075d9aeba1959ad?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
  },
  {
    id: 11,
    name: "Fortnite",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a828a91f92b224152cb5c0bb703f2535a3c8cd4b305eb336a68788246f0ba75c?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
  },
  {
    id: 12,
    name: "Dota 2",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/58a68d5be5a91e4b8be9c3e3d59afe7160f7df50c51dc301639d64512e032111?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
  },
];

const GameCard = ({ name, image }) => {
  return (
    <div className={styles.gameCard}>
      <img src={image} alt={`${name} cover`} className={styles.gameImage} />
      <h3 className={styles.gameName}>{name}</h3>
    </div>
  );
};

const Home = () => {
  return (
    
    <main className={styles.mainContent}>
      {/* FilterBar */}
      <div className={styles.filterBar}>
        <div className={styles.filterDropdown}>
          <button className={styles.dropdownToggle}>
            All games
            <span className={styles.dropdownArrow}>V</span>
          </button>
        </div>
        <div className={styles.filterDropdown}>
          <button className={styles.dropdownToggle}>
            All Platforms
            <span className={styles.dropdownArrow}>V</span>
          </button>
        </div>
        <div className={styles.filterDropdown}>
          <button className={styles.dropdownToggle}>
            Search a tournament
            <span className={styles.dropdownArrow}>V</span>
          </button>
        </div>
        <button className={styles.filterButton}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/052e3d9cc73e88b9c5618b605dae7fa2262a52e976e81cbe68c5dbb8e7cad7d7?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff"
            alt="Filter"
            className={styles.filterIcon}
          />
        </button>
      </div>
      {/* FilterBar */}

      {/* Body */}
      <section className={styles.trendingGamesSection}>
        <h2 className={styles.sectionTitle}>Currently Trending Games</h2>
          {/* ListGame */}
          <div className={styles.gameGrid}>
            {gameData.map((game) => (
              <GameCard key={game.id} name={game.name} image={game.image} />
            ))}
          </div>  
          {/* ListGame */}

          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe64eb08c7d75f5a07c3d524d832aebfee929f72d4f77f3753c2600d4884e439?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff"
            alt="Featured game banner"
            className={styles.featuredBanner}
          />
      </section>

      <nav className={styles.pagination} aria-label="Page navigation">
        <button className={styles.pageButton} aria-label="Previous page">
          &lt;
        </button>
        <button className={`${styles.pageButton} ${styles.active}`}>1</button>
        <button className={styles.pageButton}>2</button>
        <button className={styles.pageButton}>3</button>
        <button className={styles.pageButton}>4</button>
        <button className={styles.pageButton}>5</button>
        <button className={styles.pageButton} aria-label="Next page">
          &gt;
        </button>
      </nav>
      {/* Body */}
    </main>
  )
}

export default Home
