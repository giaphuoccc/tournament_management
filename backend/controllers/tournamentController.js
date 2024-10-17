import Tournaments from "../model/tournamentModel.js"; 

export const getAllTournament = async (req, res) => {
    try {
        //Lấy danh sách tất cả giải đấu từ db
        const tournaments = await Tournaments.find();
        //Gửi danh sách về client
        res.status(200).json(tournaments);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách giải đấu', error);
        res.status(500).json({ error: 'Có lỗi khi lấy danh sách giải đấu'});
    }
}