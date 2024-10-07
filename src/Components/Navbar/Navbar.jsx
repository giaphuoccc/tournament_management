//import React from 'react'
import styles from "../../styles/navbar.module.css"

const Navbar= () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoSection}>
          <h1 className={styles.logo}>LOGO</h1>
          <nav className={styles.mainNav}>
            <a href="#tournaments" className={styles.navLink}>
              Tournaments
            </a>
          </nav>
        </div>
        <div className={styles.userActions}>
          <nav className={styles.userNav}>
            <a href="#home" className={styles.navLink}>
              Home
            </a>
          </nav>
          <form className={styles.searchForm}>
            <div className={styles.searchContainer}>
                <input
                    type="search"
                    id="searchInput"
                    placeholder="Search"
                    className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1896270943c6a160a2ac7ff82e15841e9553756b8c252fbcce2a0d3c40b4e402?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff"
                        alt="Search"
                        className={styles.searchIcon}
                    />
                </button>
            </div>
          </form>
          <button className={styles.signInButton}>Sign In</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar
