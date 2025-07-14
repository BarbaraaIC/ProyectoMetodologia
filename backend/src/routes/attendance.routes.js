"use strict"

import { Router } from "express";
import { getActiveParticipantsForAttendance } from "../controllers/attendance.controller.js"

const router = new Router()

router.get("/", getActiveParticipantsForAttendance);

export default router;
