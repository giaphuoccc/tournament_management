import express from 'express'
const router = express.Router();

import { getAllTournaments } from "../controllers/tournamentController.js";

//lay danh sach giai dau
router.get('/getAllTournaments', getAllTournaments);

export default router;
