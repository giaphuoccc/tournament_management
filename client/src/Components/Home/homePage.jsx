//import React from 'react'
import styles from './styles/homePage.module.css';
import Pagination from './components/Pagination';
import GameGrid from './components/GameGrid';
import FilterBar from './components/FilterBar';

const Home = () => {
  return (
    
    <main className={styles.mainContent}>
      <FilterBar/>

      {/* Body */}
      <section className={styles.trendingGamesSection}>
        <h2 className={styles.sectionTitle}>Currently Trending Games</h2>
          {/* ListGame */}
          <GameGrid/>
          <Pagination/>
          {/* ListGame */}

          <img
            src="https://images5.alphacoders.com/114/1149776.jpg"
            alt="Featured game banner"
            className={styles.featuredBanner}
          />
      </section>          
      {/* Body */}
    </main>
  )
}

export default Home
