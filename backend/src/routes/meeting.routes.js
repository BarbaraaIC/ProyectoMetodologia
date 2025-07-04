"use strict"
import { Router } from "express";
import {getMeeting, getMeetingById, createMeeting, updateMeetingById, deleteMeetingById} from "../controllers/meeting.controller.js";

const router = new Router();

router.get("/", getMeeting);
router.get("/",getMeetingById);

router.post("/", createMeeting);
router.put("/", updateMeetingById );
router.delete("/", deleteMeetingById);

export default router;