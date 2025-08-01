"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isDirective } from "../middleware/authorization.middleware.js";
import { upload } from "../middleware/uploadArchive.middleware.js";
import { getMovimientos, createMovimiento, getMovimientoById, updateMovimiento, deleteMovimiento } from "../controllers/movimiento.controller.js";

const router = Router();

router.use(authenticateJwt);

router.get("/", getMovimientos);
router.get("/:id", getMovimientoById);

router.post("/", isDirective, upload.single("comprobante"), createMovimiento);
router.put("/:id", isDirective, upload.single("comprobante"), updateMovimiento);
router.delete("/:id", isDirective, deleteMovimiento)


export default router;