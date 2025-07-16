"use strict";
import { Router } from "express";
import { generatePDFController } from "../controllers/pdf.controller.js";
import { generatePDFControllerVotos } from "../controllers/pdf.controller.js";

const router = Router();

router.get("/", generatePDFController);
router.get("/votos", generatePDFControllerVotos);

export default router;