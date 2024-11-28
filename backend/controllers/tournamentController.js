import Tournaments from "../model/tournamentModel.js";
import GameList from "../model/gameListModel.js";

export const getAllTournaments = async (req, res) => {
  try {
    //Lấy danh sách tất cả giải đấu từ db
    const tournaments = await Tournaments.find();
    //Gửi danh sách về client
    res.status(200).json(tournaments);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách giải đấu", error);
    res.status(500).json({ error: "Có lỗi khi lấy danh sách giải đấu" });
  }
};

export const createTournament = async (req, res) => {
  const {
    name,
    organizer,
    regStatus,
    tournamentSize,
    location,
    timeStarted,
    timeEnded,
    image,
    gameId,
    rules,
    prize,
    description,
  } = req.body;

  try {
    // Check game exists?
    if (!gameId) {
      return res.status(400).json({ message: "Game ID is required" });
    }

    // Check if the game exists
    const game = await GameList.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Convert timeStarted and timeEnded to Date objects
    const parsedTimeStarted = new Date(timeStarted);
    const parsedTimeEnded = new Date(timeEnded);

    // Validate if the dates are valid
    if (
      isNaN(parsedTimeStarted.getTime()) ||
      isNaN(parsedTimeEnded.getTime())
    ) {
      return res
        .status(400)
        .json({ message: "Invalid date format for timeStarted or timeEnded" });
    }

    // Create a new tournament
    const newTournament = new Tournaments({
      name,
      organizer,
      regStatus,
      tournamentSize,
      location,
      timeStarted: parsedTimeStarted,
      timeEnded: parsedTimeEnded,
      image,
      game: gameId,
      prize,
      rules,
      description,
    });

    // Save the tournament
    const savedTournament = await newTournament.save();

    game.tournaments.push(savedTournament._id);
    await game.save();

    return res.status(201).json(savedTournament);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getTournamentByGameId = async (req, res) => {
  try {
    const gameId = req.params.gameId;
    console.log(`Tìm kiếm giải đấu cho game id: ${gameId}`);
    const tournaments = await Tournaments.find({ game: gameId });

    if (!tournaments.length) {
      return res
        .status(404)
        .json({ message: "Không có giải đấu cho game này!" });
    }

    res.json(tournaments);
    // console.log(tournaments)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTournamentByTournamentId = async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;

    // Find the tournament by its ID and only populate the 'name' field of the related game
    const tournament = await Tournaments.findById(tournamentId).populate({
      path: "game",
      select: "name", // Only include the 'name' field in the populated game data
    });

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    res.status(200).json(tournament); // Return the tournament details
  } catch (error) {
    console.error("Error fetching tournament by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTournamentById = async (req, res) => {
  const { id } = req.params; // Extract the ID from the request parameters

  try {
    const deletedTournament = await Tournaments.findByIdAndDelete(id);

    if (!deletedTournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    res
      .status(200)
      .json({ message: "Tournament deleted successfully", deletedTournament });
  } catch (error) {
    console.error("Error deleting tournament:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// update
export const updateTournamentById = async (req, res) => {
  const { tournamentId } = req.params; // Lấy ID giải đấu từ tham số URL
  const updatedData = req.body; // Dữ liệu cập nhật từ client

  console.log("Tournament ID:", tournamentId); // Log tournamentId
  console.log("Updated Data from Client:", updatedData); // Log dữ liệu nhận được

  try {
    const updatedTournament = await Tournaments.findByIdAndUpdate(
      tournamentId,
      updatedData,
      { new: true, runValidators: true }
    );

    console.log("Updated Tournament:", updatedTournament); // Log kết quả cập nhật

    if (!updatedTournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    res.status(200).json(updatedTournament);
  } catch (error) {
    console.error("Error updating tournament:", error);
    res.status(500).json({ message: "Server error" });
  }
};
