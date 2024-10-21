import express from 'express'
const router = express.Router();

import { createGame, getAllGame } from "../controllers/gameListController.js";

//lay danh sach giai dau
router.post('/createGame', createGame);
router.get('/getAllGame', getAllGame)

export default router;
