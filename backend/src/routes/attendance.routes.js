"use strict"

import { Router } from "express";
import { getActiveNeighbors, getAllEvents, registerAttendance } from "../controllers/attendance.controller.js"

const router = new Router()

router.get("/active", getActiveNeighbors);
router.get("/event", getAllEvents);
router.post("/register", registerAttendance);

export default router;
