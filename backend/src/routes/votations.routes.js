"use strict";
import { Router } from "express";
import { emitirVoto, mostrarCandidatos, mostrarResultadoVotacion, postularCandidatos, } from "../controllers/votation.controller.js";

const router = new Router();

router.post("/postularCandidatos", postularCandidatos);
router.get("/mostrarCandidatos", mostrarCandidatos);
router.post("/emitirVoto", emitirVoto);
router.get("/mostrarResultadoVotacion", mostrarResultadoVotacion);

export default router;

