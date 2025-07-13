"use strict"
import { Router } from "express";
import { getActiveParticipants,getActiveParticipantById ,createActiveParticipant, updateActiveParticipantById, deleteActiveParticipantById } from "../controllers/activeParticipants.controller.js";

const router = Router();

router.get("/", getActiveParticipants);
router.get("/", createActiveParticipant);

router.get("/:id", getActiveParticipantById);
router.post("/:id", updateActiveParticipantById);
router.put("/:id", deleteActiveParticipantById);


export default router;