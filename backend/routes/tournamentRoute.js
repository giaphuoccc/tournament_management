import express from "express";
const router = express.Router();

import {
  createTournament,
  getAllTournaments,
  getTournamentByGameId,
  getTournamentByTournamentId,
  deleteTournamentById,
} from "../controllers/tournamentController.js";

//lay danh sach giai dau
router.get("/getAllTournaments", getAllTournaments);
router.get("/getTournamentByGameId/:gameId", getTournamentByGameId);
router.post("/createTournament", createTournament);
router.get(
  "/getTournamentByTournamentId/:tournamentId",
  getTournamentByTournamentId
);
router.delete("/deleteTournamentById/:id", deleteTournamentById);

export default router;
