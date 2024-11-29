import TournamentList from '../model/tournamentModel.js';
import MatchList from '../model/matchModel.js';

export const createSchedule = async (req, res) => {
  try {
    const { tournamentID, teams } = req.body;

    if (!tournamentID || !teams || teams.length < 8) {
      return res.status(400).json({ message: 'Dữ liệu không hợp lệ. Đảm bảo số lượng đội là 8.' });
    }

    // Xáo trộn danh sách đội
    const shuffledTeams = teams.sort(() => 0.5 - Math.random());
    let matchNumber = 1;
    const matches = [];

    for (let i = 0; i < shuffledTeams.length; i += 2) {
      const match = new MatchList({
        tournamentID,
        matchNumber,
        teamA: shuffledTeams[i]._id,
        teamB: shuffledTeams[i + 1]._id,
        matchDate: new Date(),
        status: 'scheduled',
        score: { teamA: 0, teamB: 0 },
      });

      await match.save();
      matches.push(match._id); // Chỉ lưu _id của các trận đấu
      matchNumber++;
    }

    // Cập nhật tournament với danh sách các trận đấu
    await TournamentList.findByIdAndUpdate(
      tournamentID,
      { $push: { matches: { $each: matches } } }, // Thêm danh sách matches vào Tournament
      { new: true }
    );

    res.status(201).json({ message: 'Lịch thi đấu đã được tạo!', matches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi máy chủ. Vui lòng thử lại sau.' });
  }
};
