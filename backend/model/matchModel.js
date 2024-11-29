import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
    tournamentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TournamentList", // References the Core Tournament schema
        required: true,
    },
    matchNumber: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    teamA: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'TeamList', 
        required: true 
    },
    teamB: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'TeamList', 
        required: true 
    },
    matchDate: { 
        type: Date, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['scheduled', 'completed', 'cancelled'], 
        default: 'scheduled' 
    },
    score: { 
        teamA: { 
            type: Number, default: 0 }, 
        teamB: { 
            type: Number, default: 0 } 
    }
}, { timestamps: true });

const MatchList = mongoose.model("MatchList", matchSchema);
export default MatchList;