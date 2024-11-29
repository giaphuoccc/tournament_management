import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import TournamentInfo from "./components/TounamentInfo";
import MenuView from "./components/MenuView";
import MatchesSchedule from "./components/matchesSchedule";
import TournamentSidebar from "./components/TournamentSidebar";
import TourDescription from "./components/TourDescription";
import styles from "./styles/TournamentView.module.css";

function TournamentView_Information() {
  const [dataPhuoc, setDataPhuoc] = useState(null); 
  const [activeTab, setActiveTab] = useState("information"); 
  const { tournamentId } = useParams();

    // Kiểm tra giá trị của tournamentId từ URL
  useEffect(() => {
    console.log("TournamentView_Information - tournamentId:", tournamentId);
  }, [tournamentId]);

  const fetchGameData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/client/tournament/getTournamentByTournamentId/${tournamentId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDataPhuoc(data);
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  useEffect(() => {
    fetchGameData();
  }, [tournamentId]);

  return (
    <div className={styles.viewTournaments}>
      <main>
        <TournamentInfo />
        <MenuView activeTab={activeTab} setActiveTab={setActiveTab} />
        <section className={styles.contentSection}>
          {activeTab === "information" && (
            <>
              <div className={styles.descriptionSection}>
                <h3 className={styles.sectionTitle}>Description</h3>
                <p className={styles.descriptionText}>
                  {dataPhuoc ? dataPhuoc.description : "Loading..."}
                </p>
                <div className={styles.playoffsSection}>
                  <h4 className={styles.playoffsTitle}>Number of Teams</h4>
                  <p className={styles.playoffsText}>
                    {dataPhuoc ? `${dataPhuoc.tournamentSize} Teams` : "Loading..."}
                  </p>
                </div>
              </div>
              <aside className={styles.tournamentDetails}>
                <div className={styles.detailsSection}>
                  <h4 className={styles.detailsTitle}>Time of Tournament</h4>
                  <p className={styles.detailsText}>
                    Start Time: {dataPhuoc ? dataPhuoc.timeStarted : "Loading..."}
                  </p>
                  <p className={styles.detailsText}>
                    End Time: {dataPhuoc ? dataPhuoc.timeEnded : "Loading..."}
                  </p>
                </div>
                <div className={styles.detailsSection}>
                  <h4 className={styles.detailsTitle}>Registration</h4>
                  <p className={styles.detailsText}>
                    Status: {dataPhuoc ? dataPhuoc.regStatus : "Loading..."}
                  </p>
                </div>
              </aside>
            </>
          )}

          {activeTab === "matches" && <MatchesSchedule tournamentId={tournamentId} />}

          {activeTab === "participants" && (
            <div className={styles.tabContent}>
              <h3 className={styles.tabTitle}>Participants Content</h3>
              <p className={styles.tabText}>This is the participants tab content.</p>
            </div>
          )}
          {activeTab === "rules" && (
            <div className={styles.tabContent}>
              <h3 className={styles.tabTitle}>Rules Content</h3>
              <p className={styles.tabText}>This is the rules tab content.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default TournamentView_Information;
