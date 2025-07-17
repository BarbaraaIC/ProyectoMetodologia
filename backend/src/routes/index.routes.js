"use strict";
import { Router } from "express";
import authRoutes from "./auth.routes.js"
import userRoutes from "./user.routes.js";
import movimientosRoutes from "./movimiento.routes.js";

const router = new Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/movimientos", movimientosRoutes);

export default router;