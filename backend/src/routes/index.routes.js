"use strict";
import { Router } from "express";
import authRoutes from "./auth.routes.js"
import pdfRoutes from "./pdf.routes.js"
import eventRoutes from "./event.routes.js";
import votationsRoutes from "./votations.routes.js";


const router = new Router();

router.use("/auth", authRoutes);
router.use("/pdf", pdfRoutes);
router.use("/event", eventRoutes);
router.use("/votations", votationsRoutes);


export default router;