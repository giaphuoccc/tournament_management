import express from "express";
const router = express.Router();

import {
  createTournament,
  getAllTournaments,
  getTournamentByGameId,
  getTournamentByTournamentId,
  deleteTournamentById,
  updateTournamentById,
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

//update
router.put(
  "/updateTournamentById/:tournamentId",
  (req, res, next) => {
    console.log("Route hit: /updateTournamentById");
    console.log("Tournament ID:", req.params.tournamentId);
    console.log("Request Body:", req.body);
    next();
  },
  updateTournamentById
);
export default router;
