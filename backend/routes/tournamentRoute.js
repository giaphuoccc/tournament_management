import express from 'express'
const router = express.Router();

import { getAllTournament } from "../controllers/tournamentController.js";

//lay danh sach giai dau
router.get('/tournaments', getAllTournament);

export default router;
