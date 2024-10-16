const mongoose = require('mongoose');

const tournamentDetailsSchema = new mongoose.Schema({
    tournamentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CoreTournament', // References the Core Tournament schema
        required: true
    },
    rules: {
        type: [String], // Array of strings for multiple rules
        required: true
    },
    prize: {
        firstPlace: {
            type: Number,
            required: true
        },
        secondPlace: {
            type: Number,
            required: true
        },
        thirdPlace: {
            type: Number
        }
    },
    schedule: [
        {
            matchName: { type: String, required: true }, // e.g., "Quarterfinals", "Finals"
            teams: [String], // Array of team names/IDs
            matchTime: { type: Date, required: true },
            matchLocation: { type: String, required: true }
        }
    ]
}, {
    timestamps: true // Automatically add 'createdAt' and 'updatedAt'
});

module.exports = mongoose.model('TournamentDetails', tournamentDetailsSchema);
