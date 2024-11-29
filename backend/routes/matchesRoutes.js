import express from "express";
const router = express.Router();

import { getMatches, updateMatchScore } from '../controllers/matchController.js';


// Lấy danh sách trận đấu theo tournamentID
router.get('/matches/:tournamentId', getMatches);

router.put('/update-score/:matchID', updateMatchScore);

export default router;