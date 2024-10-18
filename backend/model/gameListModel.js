import mongoose from 'mongoose';

const gameListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    tournaments: [
        { type: mongoose.Schema.Types.ObjectId, ref: "TournamentList" }
    ]
});

const gameList = mongoose.model("GameList", gameListSchema);
export default gameList;