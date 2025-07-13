"use strict";

import { AppDataSource } from "../config/configDb.js";
import Participants from "../entity/activeParticipants.entity.js";

// Obtener todos los participantes activos
export async function getActiveParticipants(req, res) {
  try {
    const participantRepository = AppDataSource.getRepository(Participants);
    const participants = await participantRepository.find();
    res.status(200).json({ message: "Participantes activos encontrados", data: participants });
  } catch (error) {
    console.error("Error en getActiveParticipants():", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Obtener un participante activo por ID
export async function getActiveParticipantById(req, res) {
  try {
    const participantRepository = AppDataSource.getRepository(Participants);
    const { id } = req.params;
    const participant = await participantRepository.findOne({ where: { id } });

    if (!participant) {
      return res.status(404).json({ message: "Participante no encontrado." });
    }

    res.status(200).json({ message: "Participante activo encontrado", data: participant });
  } catch (error) {
    console.error("Error en getActiveParticipantById():", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}
// Crear un nuevo participante activo
export async function createActiveParticipant(req, res) {
  try {
const participantRepository = AppDataSource.getRepository(Participants);
    const  {rut, nombre, apellido, cargo, activo } = req.body; 
    const newParticipant = participantRepository.create({
      rut,
      nombre,
      apellido,
      cargo,
      activo: activo ?? true, // Por defecto, activo es true
    });
    const savedParticipant = await participantRepository.save(newParticipant);
    res.status(201).json({ message: "Participante activo creado exitosamente.", data: savedParticipant });
  } catch (error) { 
    console.error("Error en añadir nuevo participante", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Actualizar un participante activo por ID
export async function updateActiveParticipantById(req, res) {
  try {
    const participantRepository = AppDataSource.getRepository(Participants);
    const { id } = req.params;
    const { cargo, activo } = req.body;

    const participant = await participantRepository.findOne({ where: { id } });

    if (!participant) {
      return res.status(404).json({ message: "Participante no encontrado." });
    }

    participant.cargo = cargo ?? participant.cargo;
    participant.activo = activo ?? participant.activo;

    await participantRepository.save(participant);

    res.status(200).json({ message: "Participante actualizado exitosamente.", data: participant });
  } catch (error) {
    console.error("Error en updateActiveParticipantById():", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Eliminar un participante activo por ID
export async function deleteActiveParticipantById(req, res) {
  try {
    const participantRepository = AppDataSource.getRepository(Participants);
    const { id } = req.params;
    const participant = await participantRepository.findOne({ where: { id } });

    if (!participant) {
      return res.status(404).json({ message: "Participante no encontrado." });
    }

    await participantRepository.remove(participant);

    res.status(200).json({ message: "Participante eliminado exitosamente." });
  } catch (error) {
    console.error("Error en deleteActiveParticipantById():", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}
