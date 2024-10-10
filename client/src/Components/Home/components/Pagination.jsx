import React from "react";
import styles from "../styles/Pagination.module.css";

const Pagination = () => {
  return (
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
  );
};

export default Pagination;