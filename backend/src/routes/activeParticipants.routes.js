"use strict"
import { Router } from "express";
import { getActiveParticipants,getActiveParticipantById , updateActiveParticipantById, deleteActiveParticipantById } from "../controllers/activeParticipants.controller.js";

const router = Router();

router.get("/", getActiveParticipants);


router.get("/", getActiveParticipantById);
router.post("/", updateActiveParticipantById);
router.put("/", deleteActiveParticipantById);


export default router;