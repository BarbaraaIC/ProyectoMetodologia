"use strict";

import { AppDataSource } from "../config/configDb.js";
import { ActiveParticipantsEntity } from "../entity/activeParticipants.entity.js";
import { activeParticipantSchema } from "../validations/activeParticipants.validation.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

// Obtener todos los participantes activos
export async function getActiveParticipants(req, res) {
  try {
    const participantRepository = AppDataSource.getRepository(ActiveParticipantsEntity);
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
    const participantRepository = AppDataSource.getRepository(ActiveParticipantsEntity);
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
  const { error } = activeParticipantSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const participantRepository = AppDataSource.getRepository(ActiveParticipantsEntity);
    const { rut, nombre, apellido, cargo, activo, password, email } = req.body;

    // Validación para ingresar cargo como vecino solamente
    if (cargo.toLowerCase() !== "vecino") {
      return res.status(400).json({ message: "El cargo solo puede ser 'vecino' al momento de crear un participante." });
    }

    // Verificar si el RUT ya existe
    const existingParticipant = await participantRepository.findOne({ where: { rut } });
    if (existingParticipant) {
      return res.status(400).json({ message: "Ya existe un participante con este RUT." });
    }
    // Verificar si el correo ya existe
    const existingEmail = await participantRepository.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: "Ya existe un participante con este correo electrónico." });
    }


    // Encriptar la contraseña antes de guardar
    const hashedPassword = await encryptPassword(password);

    const newParticipant = participantRepository.create({
      rut,
      nombre,
      apellido,
      cargo,
      activo: activo ?? true,
      password: hashedPassword,
      email 
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
    const participantRepository = AppDataSource.getRepository(ActiveParticipantsEntity);
    const { id } = req.params;
    const { cargo, activo } = req.body;

    const participant = await participantRepository.findOne({ where: { id } });

    if (!participant) {
      return res.status(404).json({ message: "Participante no encontrado." });
    }
// Validar que el nuevo cargo sea uno permitido, si se está intentando actualizar
    const cargosValidos = ["vecino", "presidente", "secretario", "tesorero"];
    if (cargo && !cargosValidos.includes(cargo.toLowerCase())) {
      return res.status(400).json({ message: `Cargo inválido. Solo se permiten: ${cargosValidos.join(", ")}.` });
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
    const participantRepository = AppDataSource.getRepository(ActiveParticipantsEntity);
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