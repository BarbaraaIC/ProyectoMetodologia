"use strict"
import { Router } from "express";
import {getEvents, getEventById, createEvent, updateEventById, deleteEventById} from "../controllers/event.controller.js";

const router = new Router();

router.get("/", getEvents);
router.get("/:id", getEventById);

router.post("/", createEvent);
router.put("/:id", updateEventById );
router.delete("/:id", deleteEventById);

export default router;
