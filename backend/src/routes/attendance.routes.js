"use strict"

import { Router } from "express";
import { registerAttendance } from "../controllers/attendance.controller.js"

const router = new Router()

router.post("/register", registerAttendance);

export default router;