import styles from '../styles/matchesSchedule.module.css';

const MatchesSchedule = () => {
  return (
    <div className={styles.bracket}>
      <h2>Vòng loại trực tiếp</h2>
      <div className={styles.rounds}>
        
        {/* Vòng 1 */}
        <div className={styles.roundContainer}>
          <h3 className={styles.roundNumber}>Vòng 1</h3>
          <div className={styles.groupContainer1}>
            <div className={styles.matchContainer}>
              <div className={styles.match}>
                <div className={styles.team}>
                  Team 1 <span className={styles.scoreWinner}>2</span>
                </div>
                <div className={styles.team}>
                  Team 2 <span className={styles.scoreDefeat}>0</span>
                </div>
              </div>
            </div>
            <div className={styles.matchContainer}>
              <div className={styles.match}>
                <div className={styles.team}>
                  Team 3 <span className={styles.scoreWinner}>2</span>
                </div>
                <div className={styles.team}>
                  Team 4 <span className={styles.scoreDefeat}>1</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.groupContainer2}>
            <div className={styles.matchContainer}>
              <div className={styles.match}>
                <div className={styles.team}>
                  Team 5 <span className={styles.score}>2</span>
                </div>
                <div className={styles.team}>
                  Team 6 <span className={styles.score}>0</span>
                </div>
              </div>
            </div>
            <div className={styles.matchContainer}>
              <div className={styles.match}>
                <div className={styles.team}>
                  Team 7 <span className={styles.score}>2</span>
                </div>
                <div className={styles.team}>
                  Team 8 <span className={styles.score}>0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Vòng 2 */}
        <div className={styles.roundContainer}>
        <h3 className={styles.roundNumber}>Vòng 2</h3>
          <div className={styles.groupContainer3}>
            <div className={styles.matchContainer5}>
              <div className={styles.match}>
                <div className={styles.team}>
                  Team 1 <span className={styles.score}>2</span>
                </div>
                <div className={styles.team}>
                  Team 3 <span className={styles.score}>0</span>
                </div>
              </div>
            </div>
            <div className={styles.matchContainer6}>
              <div className={styles.match}>
                <div className={styles.team}>
                  Team 5 <span className={styles.score}>0</span>
                </div>
                <div className={styles.team}>
                  Team 7 <span className={styles.score}>2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vòng 3 - Final */}
        <div className={styles.roundContainer}>
          <h3 className={styles.roundNumber}>Vòng 3</h3>
            <div className={styles.groupContainer4}>
              <div className={styles.matchContainer}>
                <div className={styles.match}>
                  <div className={styles.team}>
                    Team 7 <span className={styles.score}>2</span>
                  </div>
                  <div className={styles.team}>
                    Team 1 <span className={styles.score}>1</span>
                  </div>
                </div>
              </div>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default MatchesSchedule;