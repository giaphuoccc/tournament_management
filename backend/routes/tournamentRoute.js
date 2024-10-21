import express from 'express'
const router = express.Router();

import { createTournament, getAllTournaments, getTournamentByGameId } from "../controllers/tournamentController.js";

//lay danh sach giai dau
router.get('/getAllTournaments', getAllTournaments);
router.get('/getTournamentByGameId/:gameId', getTournamentByGameId);
router.post('/createTournament', createTournament);

export default router;
