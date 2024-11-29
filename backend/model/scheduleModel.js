import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    tournamentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TournamentList", // References the Core Tournament schema
      required: true,
    },
    matches: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'MatchList'
      }
    ],
    startDate: { 
      type: Date, 
      required: true },
    endDate: { 
      type: Date, 
      required: true }
}, { timestamps: true });

const TournamentSchedule = mongoose.model("TournamentSchedule", scheduleSchema);
export default TournamentSchedule;
