import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const tournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    organizer: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'closed', 'completed'],
        required: true
    },
    teamSize: {
        type: Number,
        required: true,
        min: 2 // least
    },
    location: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    image: {
        type: String
    },
    game: [
        { type: mongoose.Schema.Types.ObjectId, ref: "GameList"}
    ]
}, {
    timestamps: true // Tự động thêm 'createdAt' và 'updatedAt'
});

const TournamentList = mongoose.model("TournamentList", tournamentSchema);
export default TournamentList;