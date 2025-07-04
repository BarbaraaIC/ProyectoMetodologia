"use strict"
import { Router } from "express";
import {getEvent, createEvent, updateEvent, deleteEvent} from "../controllers/event.controller.js";

const router = new Router();

router.get("/", getEvent);

router.post("/", createEvent);
router.put("/", updateEvent );
router.delete("/", deleteEvent);

export default router;
