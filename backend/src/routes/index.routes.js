"use strict";
import { Router } from "express";
import { generatePDFController } from "../controllers/pdf.controller.js";
import authRoutes from "./auth.routes.js"
import userRoutes from "./user.routes.js";
import pdfRoutes from "./pdf.routes.js"

const router = new Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/pdf", pdfRoutes);
router.get("/", generatePDFController);

export default router;