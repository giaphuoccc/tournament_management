import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true 
    },
    logo: { 
      type: String 
    },
    captain: { 
      type: String, 
      required: true 
    },
    players: [
        {
          name: { type: String },
          role: { type: String },
        },
    ],
    tournament: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'TournamentList'  // Tham chiếu trực tiếp đến giải đấu
    }
  }, { timestamps: true });

const TeamList = mongoose.model("TeamList", teamSchema);
export default TeamList;