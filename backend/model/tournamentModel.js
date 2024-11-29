import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    organizer: {
      type: String,
      required: true,
    },
    regStatus: {
      type: String,
      enum: ["open", "closed"],
      required: true,
    },
    tournamentSize: {
      type: String,
      enum: ["8", "16"], // 8 or 16 teams only
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    timeStarted: {
      type: Date,
      required: true,
    },
    timeEnded: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GameList",
    },
    rules: {
      type: String, // Array of strings for multiple rules
    },
    description: {
      type: String, // Array of strings for multiple rules
    },
    prize: {
      type: Number,
    },
    teams: [
      { type: mongoose.Schema.Types.ObjectId, 
        ref: "TeamList" }
    ],
    matches: [
      { type: mongoose.Schema.Types.ObjectId, 
        ref: 'MatchList' }
    ]
  },
  {
    timestamps: true, // Tự động thêm 'createdAt' và 'updatedAt'
  }
);

const TournamentList = mongoose.model("TournamentList", tournamentSchema);
export default TournamentList;
