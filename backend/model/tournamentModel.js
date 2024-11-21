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
    //   secondPlace: {
    //     type: Number,
    //     required: true,
    //   },
    //   thirdPlace: {
    //     type: Number,
    //   },
    // },
    // schedule: [
    //   {
    //     matchName: { type: String, required: true }, // e.g., "Quarterfinals", "Finals"
    //     teams: [String], // Array of team names/IDs
    //     matchTime: { type: Date, required: true },
    //     matchLocation: { type: String, required: true },
    //   },
    // ],
  },
  {
    timestamps: true, // Tự động thêm 'createdAt' và 'updatedAt'
  }
);

const TournamentList = mongoose.model("TournamentList", tournamentSchema);
export default TournamentList;
