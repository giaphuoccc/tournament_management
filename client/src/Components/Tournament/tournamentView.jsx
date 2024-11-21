import { useState } from "react";
import TournamentList from "./components/TournamentList";
import location from "../Organizer_Home/data/LocationData"; // Import dữ liệu Location
import styles from "./styles/TournamentPage.module.css";

const TournamentPage = () => {
  const [selectedTab, setSelectedTab] = useState("Ongoing");
  const [selectedCountry, setSelectedCountry] = useState("All");

  // Lấy danh sách quốc gia từ LocationData và thêm "All" làm lựa chọn đầu tiên
  const countries = ["All", ...location.map((loc) => loc.name)];

  return (
    <div className={styles.tournamentPage}>
      <main className={styles.mainContent}>
        <section className={styles.heroSection}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fb0e55c55f17b7fd2e0d9b0b72e2c0c8c052e339ce989865e941c979972c85d1?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff"
            alt=""
            className={styles.heroBackground}
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/02c4a5e70259c140a9f67c94329cf4172004aad525494f813869eecd809c114c?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff"
            alt="Tournament logo"
            className={styles.heroLogo}
          />
        </section>
        <section className={styles.tournamentSection}>
          <div className={styles.headerRow}>
            <h1 className={styles.sectionTitle}>TOURNAMENTS</h1>
            <select
              className={styles.countrySelect}
              value={selectedCountry}
              onChange={(e) => {
                console.log("Selected country:", e.target.value); // Kiểm tra giá trị
                setSelectedCountry(e.target.value);
              }}
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <nav className={styles.tournamentNav}>
            <ul className={styles.navList}>
              {["Past", "Ongoing", "Upcoming"].map((tab) => (
                <li
                  key={tab}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedTab(tab)}
                  onKeyPress={(e) => e.key === "Enter" && setSelectedTab(tab)}
                  className={selectedTab === tab ? styles.active : ""}
                >
                  {tab}
                  {selectedTab === tab && (
                    <div className={styles.activeIndicator} />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <TournamentList
            tournamentStatus={selectedTab}
            countryFilter={selectedCountry} // Truyền quốc gia đã chọn xuống TournamentList
          />
        </section>
      </main>
    </div>
  );
};

export default TournamentPage;
