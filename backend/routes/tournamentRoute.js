import express from "express";
const router = express.Router();

import {
  createTournament,
  getAllTournaments,
  getTournamentByGameId,
  getTournamentByTournamentId,
} from "../controllers/tournamentController.js";

//lay danh sach giai dau
router.get("/getAllTournaments", getAllTournaments);
router.get("/getTournamentByGameId/:gameId", getTournamentByGameId);
router.post("/createTournament", createTournament);
router.get(
  "/getTournamentByTournamentId/:tournamentId",
  getTournamentByTournamentId
);

export default router;
