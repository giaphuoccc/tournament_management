import express from "express";
const router = express.Router();

import {
    createSchedule,
} from "../controllers/scheduleController.js";

router.post("/createSchedule", createSchedule);

export default router;