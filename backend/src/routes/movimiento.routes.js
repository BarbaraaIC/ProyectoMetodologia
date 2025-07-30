"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";
import multer from "multer";
import { getMovimientos, createMovimiento, getMovimientoById, updateMovimiento, deleteMovimiento } from "../controllers/movimiento.controller.js";


const router = Router();
const upload = multer ({ dest: "uploads/" });

router.use(authenticateJwt);


router.get("/", getMovimientos);
router.get("/:id", getMovimientoById);

router.post("/", isAdmin, upload.single("comprobante"), createMovimiento);
router.put("/:id", isAdmin, updateMovimiento);
router.delete("/:id", isAdmin, deleteMovimiento)


export default router;