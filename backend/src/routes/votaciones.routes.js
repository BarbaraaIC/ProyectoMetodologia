"use strict";
import { Router } from "express";
import { emitirVoto, mostrarCandidatos, mostrarResultadoVotacion, postularCandidatos, } from "../controllers/votaciones.controller.js";

const router = new Router();

router.get("/", postularCandidatos);
router.post("/", mostrarCandidatos);
router.post("/", emitirVoto);
router.get("/", mostrarResultadoVotacion);

export default router;

