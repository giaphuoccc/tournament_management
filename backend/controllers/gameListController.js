import GameList from '../model/gameListModel.js'

// Create Game
export const createGame = async (req, res) => {
    try {
        const { name, image } = req.body;

        // Validate request body
        if (!name || !image) {
            return res.status(400).json({ message: "Name and image are required" });
        }

        // Create the new game
        const newGame = new GameList({
            name,
            image
        });

        // Save the game to the database
        const savedGame = await newGame.save();

        return res.status(201).json({ message: "Game created successfully", game: savedGame });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getAllGame = async (req, res) => {
    try {
        const games = await GameList.find();
        res.status(200).json(games);
    } catch (error) {
        console.error("Có lỗi khi lấy danh sách game", error);
        res.status(500).json("Có lỗi khi lấy danh sách game");
    }
}