"use strict";
import { Router } from "express";
import authRoutes from "./auth.routes.js"
import userRoutes from "./user.routes.js";
import pdfRoutes from "./pdf.routes.js"
import eventRoutes from "./event.routes.js";
import meetingRoutes from "./meeting.routes.js";

import votationsRoutes from "./votations.routes.js";


const router = new Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/pdf", pdfRoutes);
router.use("/event", eventRoutes);
router.use("/meeting", meetingRoutes);
router.use("/votations", votationsRoutes);


export default router;