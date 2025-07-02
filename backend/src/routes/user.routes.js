"use strict";
import { Router } from "express";
import { getUsers, getUserById, getProfile, updateUserById, deleteUserById } from "../controllers/user.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";
import { generatePDFController } from "../controllers/pdf.controller.js";

const router = Router();


// ruta para obtener el pdf
router.get("/", generatePDFController);

// Middleware para autenticar el JWT
router.use(authenticateJwt);

// Rutas públicas
router.get("/profile", getProfile);

// Middleware para verificar si el usuario es administrador
router.use(isAdmin);

// Rutas para obtener usuarios
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;