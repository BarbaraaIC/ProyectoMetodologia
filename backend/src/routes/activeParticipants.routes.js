"use strict"
import { Router } from "express";
import { getActiveParticipants,getActiveParticipantById ,createActiveParticipant, 
updateActiveParticipantById, deleteActiveParticipantById } from "../controllers/activeParticipants.controller.js";

const router = Router();

router.get("/", getActiveParticipants);
router.post("/", createActiveParticipant);

router.get("/:id", getActiveParticipantById);
router.put("/:id", updateActiveParticipantById);
router.delete("/:id", deleteActiveParticipantById);


export default router;