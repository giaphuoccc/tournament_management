import styles from "../styles/FilterBar.module.css";

const FilterBar = () => {
  return (
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
        <input
          className={styles.dropdownToggle}
          type="search"
          placeholder="Search a Tournament"
        />
      </div>
      <button className={styles.filterButton}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/052e3d9cc73e88b9c5618b605dae7fa2262a52e976e81cbe68c5dbb8e7cad7d7?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff"
          alt="Filter"
          className={styles.filterIcon}
        />
      </button>
    </div>
  );
};

export default FilterBar;
