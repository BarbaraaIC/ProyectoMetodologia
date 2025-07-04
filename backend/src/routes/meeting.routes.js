"use strict"
import { Router } from "express";
import {getMeeting, createMeeting, updateMeeting, deleteMeeting} from "../controllers/meeting.controller.js";

const router = new Router();

router.get("/", getMeeting);

router.post("/", createMeeting);
router.put("/", updateMeeting );
router.delete("/", deleteMeeting);

export default router;