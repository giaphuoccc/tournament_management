// import styles from '../styles/matchesSchedule.module.css';

// const MatchesSchedule = () => {
//   return (
//     <div className={styles.bracket}>
//       <h2>Vòng loại trực tiếp</h2>
//       <div className={styles.rounds}>
        
//         {/* Vòng 1 */}
//         <div className={styles.roundContainer}>
//           <h3 className={styles.roundNumber}>Vòng 1</h3>
//           <div className={styles.groupContainer1}>
//             <div className={styles.matchContainer}>
//               <div className={styles.match}>
//                 <div className={styles.team}>
//                   Team 1 <span className={styles.scoreWinner}>2</span>
//                 </div>
//                 <div className={styles.team}>
//                   Team 2 <span className={styles.scoreDefeat}>0</span>
//                 </div>
//               </div>
//             </div>
//             <div className={styles.matchContainer}>
//               <div className={styles.match}>
//                 <div className={styles.team}>
//                   Team 3 <span className={styles.scoreWinner}>2</span>
//                 </div>
//                 <div className={styles.team}>
//                   Team 4 <span className={styles.scoreDefeat}>1</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className={styles.groupContainer2}>
//             <div className={styles.matchContainer}>
//               <div className={styles.match}>
//                 <div className={styles.team}>
//                   Team 5 <span className={styles.scoreWinner}>2</span>
//                 </div>
//                 <div className={styles.team}>
//                   Team 6 <span className={styles.scoreDefeat}>0</span>
//                 </div>
//               </div>
//             </div>
//             <div className={styles.matchContainer}>
//               <div className={styles.match}>
//                 <div className={styles.team}>
//                   Team 7 <span className={styles.scoreWinner}>2</span>
//                 </div>
//                 <div className={styles.team}>
//                   Team 8 <span className={styles.scoreDefeat}>0</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Vòng 2 */}
//         <div className={styles.roundContainer}>
//         <h3 className={styles.roundNumber}>Vòng 2</h3>
//           <div className={styles.groupContainer3}>
//             <div className={styles.matchContainer5}>
//               <div className={styles.match}>
//                 <div className={styles.team}>
//                   Team 1 <span className={styles.scoreWinner}>2</span>
//                 </div>
//                 <div className={styles.team}>
//                   Team 3 <span className={styles.scoreDefeat}>0</span>
//                 </div>
//               </div>
//             </div>
//             <div className={styles.matchContainer6}>
//               <div className={styles.match}>
//                 <div className={styles.team}>
//                   Team 5 <span className={styles.scoreDefeat}>0</span>
//                 </div>
//                 <div className={styles.team}>
//                   Team 7 <span className={styles.scoreWinner}>2</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Vòng 3 - Final */}
//         <div className={styles.roundContainer}>
//           <h3 className={styles.roundNumber}>Vòng 3</h3>
//             <div className={styles.groupContainer4}>
//               <div className={styles.matchContainer}>
//                 <div className={styles.match}>
//                   <div className={styles.team}>
//                     Team 7 <span className={styles.scoreWinner}>2</span>
//                   </div>
//                   <div className={styles.team}>
//                     Team 1 <span className={styles.scoreDefeat}>1</span>
//                   </div>
//                 </div>
//               </div>
//           </div> 
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MatchesSchedule;

import { useEffect, useState } from 'react';
import styles from '../styles/matchesSchedule.module.css';

const MatchesSchedule = ({ tournamentId }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roundsData, setRoundsData] = useState({
    round1: [],
    round2: [],
    final: [],
  });

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchMatches = async () => {
      if (!tournamentId) {
        console.error('Tournament ID is undefined.');
        return;
      }

      setLoading(true); // Reset loading state when tournamentId changes
      setMatches([]); // Reset matches state to avoid showing stale data

      try {
        console.log(`Fetching matches for tournamentId: ${tournamentId}`);
        const response = await fetch(`http://localhost:3000/client/matches/matches/${tournamentId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Filter and set matches data based on rounds
        const round1 = data.filter((match) => match.matchNumber <= 4); // Vòng 1
        const round2 = data.filter((match) => match.matchNumber > 4 && match.matchNumber <= 6); // Vòng 2
        const final = data.filter((match) => match.matchNumber > 6); // Vòng chung kết

        setMatches(data);
        setRoundsData({ round1, round2, final });
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchMatches();
  }, [tournamentId]); // Runs whenever tournamentId changes

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.bracket}>
      <h2>Vòng loại trực tiếp</h2>
      <div className={styles.rounds}>
        {/* Vòng 1 */}
        {roundsData.round1.length > 0 && (
          <div className={`${styles.roundContainer} ${styles.round1}`}>
            <h3 className={styles.roundNumber}>Vòng 1</h3>
            <div className={styles.groupContainer1}>
              {roundsData.round1.map((match) => (
                <div className={styles.matchContainer} key={match._id}>
                  <div className={styles.match}>
                    <div className={styles.team}>
                      {match.teamA.name}{' '}
                      <span className={match.score.teamA > match.score.teamB ? styles.scoreWinner : styles.scoreDefeat}>
                        {match.score.teamA}
                      </span>
                    </div>
                    <div className={styles.team}>
                      {match.teamB.name}{' '}
                      <span className={match.score.teamB > match.score.teamA ? styles.scoreWinner : styles.scoreDefeat}>
                        {match.score.teamB}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vòng 2 */}
        {roundsData.round2.length > 0 && (
          <div className={`${styles.roundContainer} ${styles.round2}`}>
            <h3 className={styles.roundNumber}>Vòng 2</h3>
            <div className={styles.groupContainer3}>
              {roundsData.round2.map((match) => (
                <div className={styles.matchContainer} key={match._id}>
                  <div className={styles.match}>
                    <div className={styles.team}>
                      {match.teamA.name}{' '}
                      <span className={match.score.teamA > match.score.teamB ? styles.scoreWinner : styles.scoreDefeat}>
                        {match.score.teamA}
                      </span>
                    </div>
                    <div className={styles.team}>
                      {match.teamB.name}{' '}
                      <span className={match.score.teamB > match.score.teamA ? styles.scoreWinner : styles.scoreDefeat}>
                        {match.score.teamB}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vòng 3 - Chung kết */}
        {roundsData.final.length > 0 && (
          <div className={`${styles.roundContainer} ${styles.round3}`}>
            <h3 className={styles.roundNumber}>Vòng 3</h3>
            <div className={styles.groupContainer4}>
              {roundsData.final.map((match) => (
                <div className={styles.matchContainer} key={match._id}>
                  <div className={styles.match}>
                    <div className={styles.team}>
                      {match.teamA.name}{' '}
                      <span className={match.score.teamA > match.score.teamB ? styles.scoreWinner : styles.scoreDefeat}>
                        {match.score.teamA}
                      </span>
                    </div>
                    <div className={styles.team}>
                      {match.teamB.name}{' '}
                      <span className={match.score.teamB > match.score.teamA ? styles.scoreWinner : styles.scoreDefeat}>
                        {match.score.teamB}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesSchedule;
