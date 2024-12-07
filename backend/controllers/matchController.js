import mongoose from 'mongoose';
import MatchList from '../model/matchModel.js';
import TeamList from '../model/teamModel.js';
import TournamentList from '../model/tournamentModel.js';

// Lấy danh sách trận đấu theo tournamentID
// export const getMatches = async (req, res) => {
//     const { tournamentId } = req.params;
//     try {
//       const matches = await MatchList.find({ tournamentId })
//         .populate('teamA teamB tournamentID')
//         .sort({ matchNumber: 1 });
  
//       if (!matches.length) {
//         return res.status(404).json({ message: 'Không có trận đấu nào cho giải đấu này' });
//       }
//       res.status(200).json(matches);
//     } catch (error) {
//       console.error('Lỗi khi lấy danh sách trận đấu:', error); // Log chi tiết lỗi
//       res.status(500).json({ message: 'Lỗi khi lấy danh sách trận đấu', error: error.message });
//     }
//   };

export const getMatches = async (req, res) => {
    const { tournamentId } = req.params;
  
    console.log("Fetching matches for tournamentId:", tournamentId); // Log để kiểm tra tournamentId
  
    try {
      // Sử dụng 'new' để khởi tạo ObjectId
      const matches = await MatchList.find({ tournamentID: new mongoose.Types.ObjectId(tournamentId) })
        .populate('teamA teamB tournamentID')
        .sort({ matchNumber: 1 });
  
      if (!matches.length) {
        return res.status(404).json({ message: 'Không có trận đấu nào cho giải đấu này' });
      }
  
      res.status(200).json(matches);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách trận đấu:', error);
      res.status(500).json({ message: 'Lỗi khi lấy danh sách trận đấu', error: error.message });
    }
  };
  
  export const updateMatchScore = async (req, res) => {
    const { matchID } = req.params;
    const { scoreA, scoreB } = req.body;
  
    try {
      // 1. Cập nhật tỷ số trận đấu hiện tại
      const match = await MatchList.findById(matchID);
      if (!match) return res.status(404).json({ message: 'Match not found' });
  
      match.score.teamA = scoreA;
      match.score.teamB = scoreB;
      match.status = 'completed';
      await match.save();
  
      // 2. Lấy tất cả các trận của giải đấu hiện tại
      const allMatches = await MatchList.find({ tournamentID: match.tournamentID });
  
      // Kiểm tra nếu tất cả các trận vòng 1 hoàn tất, tạo vòng 2
      const round1Matches = allMatches.filter((m) => m.matchNumber <= 4);
      const allRound1Completed = round1Matches.every((m) => m.status === 'completed');
  
      if (allRound1Completed) {
        const winnersRound1 = round1Matches.map((match) =>
          match.score.teamA > match.score.teamB ? match.teamA : match.teamB
        );
  
        // Kiểm tra danh sách đội thắng đã được xác định đầy đủ
        if (winnersRound1.length === 4 && winnersRound1.every((team) => team)) {
          // Nếu chưa tạo vòng 2 thì tạo các trận đấu
          if (!allMatches.some((m) => m.matchNumber === 5)) {
            const round2Matches = [
              { teamA: winnersRound1[0], teamB: winnersRound1[1], matchNumber: 5 },
              { teamA: winnersRound1[2], teamB: winnersRound1[3], matchNumber: 6 },
            ];
  
            await Promise.all(
              round2Matches.map((matchData) =>
                MatchList.create({
                  tournamentID: match.tournamentID,
                  matchNumber: matchData.matchNumber,
                  teamA: matchData.teamA,
                  teamB: matchData.teamB,
                  matchDate: new Date(),
                  status: 'scheduled',
                })
              )
            );
  
            console.log('Round 2 matches created!');
          }
        } else {
          console.error('Invalid winners from round 1, cannot create round 2 matches.');
        }
      }
  
      // 3. Kiểm tra nếu tất cả các trận vòng 2 hoàn tất, tạo trận chung kết
      const round2Matches = allMatches.filter((m) => m.matchNumber >= 5 && m.matchNumber <= 6);
      const allRound2Completed = round2Matches.every((m) => m.status === 'completed');
  
      if (allRound2Completed) {
        const winnersRound2 = round2Matches.map((match) =>
          match.score.teamA > match.score.teamB ? match.teamA : match.teamB
        );
  
        // Kiểm tra danh sách đội thắng đã được xác định đầy đủ
        if (winnersRound2.length === 2 && winnersRound2.every((team) => team)) {
          // Nếu chưa tạo trận chung kết thì tạo
          if (!allMatches.some((m) => m.matchNumber === 7)) {
            await MatchList.create({
              tournamentID: match.tournamentID,
              matchNumber: 7, // Số trận chung kết
              teamA: winnersRound2[0],
              teamB: winnersRound2[1],
              matchDate: new Date(),
              status: 'scheduled',
            });
  
            console.log('Final match created!');
          }
        } else {
          console.error('Invalid winners from round 2, cannot create final match.');
        }
      }
  
      res.status(200).json({ message: 'Score updated and checked round progression' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating match score', error });
    }
  };