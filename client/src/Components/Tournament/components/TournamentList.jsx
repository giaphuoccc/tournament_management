import TournamentCard from "./TournamentCard";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";

import styles from "../styles/TournamentList.module.css";

const TournamentList = ({ tournamentStatus, countryFilter }) => {
  const [tournamentData, setTournamentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sử dụng giá trị từ `countryFilter` truyền xuống
  const filterLocation = countryFilter || "";

  const { gameId } = useParams();

  useEffect(() => {
    const fetchTournamentDataByGameId = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/client/tournament/getTournamentByGameId/${gameId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTournamentData(data);

        // Thêm log để kiểm tra dữ liệu trả về
        console.log("Fetched tournament data:", data);
      } catch (error) {
        console.error("Error fetching tournament data", error);
        setError("Error fetching tournament data");
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentDataByGameId();
  }, [gameId]);

  if (loading) {
    return <div>Loading tournaments...</div>;
  }

  if (error) {
    return (
      <div>
        <Alert variant="outlined" severity="error">
          This is an outlined error Alert.
        </Alert>
      </div>
    );
  }

  //Date today
  const currentDate = new Date();

  const filteredTournaments = tournamentData.filter((tournament) => {
    const startDate = new Date(tournament.timeStarted);
    const endDate = new Date(tournament.timeEnded);
    const matchesLocation =
      filterLocation === "All" ||
      tournament.location.toLowerCase() === filterLocation.toLowerCase();

    if (tournamentStatus === "Ongoing") {
      return (
        startDate <= currentDate && endDate >= currentDate && matchesLocation
      );
    }
    if (tournamentStatus === "Past") {
      return endDate < currentDate && matchesLocation;
    }
    if (tournamentStatus === "Upcoming") {
      return startDate > currentDate && matchesLocation;
    }
    return matchesLocation;
  });

  return (
    <div className={styles.tournamentList}>
      {filteredTournaments.map((data) => (
        <TournamentCard key={data._id} {...data} />
      ))}
      <nav className={styles.pagination} aria-label="Tournament list pages">
        {/* <button className={styles.paginationButton} aria-label="Previous page">
          &lt;
        </button>
        <button className={`${styles.paginationButton} ${styles.active}`}>
          1
        </button>
        <button className={styles.paginationButton}>2</button>
        <button className={styles.paginationButton}>3</button>
        <button className={styles.paginationButton} aria-label="Next page">
          &gt;
        </button> */}
      </nav>
    </div>
  );
};

export default TournamentList;

//   {
//     id: 1,
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/3b59e9670453fa5f95b895e2616d8b3288d041b68e9f9c7238a37357970a069b?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
//     title: "LOL Advanced League",
//     organizer: "Skill Check Esport",
//     date: "October 2, 2024 - December 24, 2024",
//     location: "Online, North America",
//     teams: 20,
//   },
//   {
//     id: 2,
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/3b59e9670453fa5f95b895e2616d8b3288d041b68e9f9c7238a37357970a069b?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
//     title: "LOL Novice League",
//     organizer: "Skill Check Esport",
//     date: "October 2, 2024 - December 24, 2024",
//     location: "Online, North America",
//     teams: 20,
//   },
//   {
//     id: 3,
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/e265e444d284082d33c22447609b611de888093afa4725a09545941ed9827a2f?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
//     title: "CDE 2024 - Playoffs",
//     organizer: "Webedia, Riot Games France, DivE",
//     date: "October 1, 2024 - October 22, 2024",
//     location: "Online",
//     teams: 8,
//     status: "Registration Closed",
//   },
//   {
//     id: 4,
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/0e8ab2c3809f37b10f102ca365d853b26e3342ea5e14b45e1a7c768759b5c379?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
//     title: "LSSE - LoL Automne 2024",
//     organizer: "Fédération québécoise de sports électroniques",
//     date: "October 1, 2024 - December 10, 2024",
//     location: "Online",
//     teams: 20,
//   },
//   {
//     id: 5,
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/e265e444d284082d33c22447609b611de888093afa4725a09545941ed9827a2f?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
//     title: "Bear",
//     organizer: "League Of Legends(PC)",
//     date: "September 30, 2024 - September 30, 2030",
//     location: "Online",
//     teams: 16,
//     status: "Registration Open",
//   },
//   {
//     id: 6,
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/beee066b7bdfbadbb1a631994e640dd3527006c22c59c329fc6bbd8f221f1413?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
//     title: "League MAG",
//     organizer: "zhonions",
//     date: "September 29, 2024 - October 6, 2024",
//     location: "Online",
//     teams: 8,
//     status: "Registration Closed",
//   },
//   {
//     id: 7,
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/b08425b548a6805887c8e0749f559af3e7f420a98165f61e690255733e2d1ff3?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
//     title: "FBT League of Legends 2024",
//     organizer: "League Of Legends(PC)",
//     date: "September 21, 2024 - December 15, 2024",
//     location: "Online",
//     teams: 64,
//     status: "Registration Closed",
//   },
//   {
//     id: 8,
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/e265e444d284082d33c22447609b611de888093afa4725a09545941ed9827a2f?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff",
//     title: "GLIAC League of Legends League",
//     organizer: "GLIAC",
//     date: "September 9, 2024 - December 31, 2024",
//     location: "Online",
//     teams: 8,
//   },
// ];
