"use strict";

import { AppDataSource } from "../config/configDb.js";
import AttendanceEntity from "../entity/attendance.entity.js";
import EventEntity from "../entity/event.entity.js";
import { ActiveParticipantsEntity } from "../entity/activeParticipants.entity.js";

export async function registerAttendance(req, res) {
    const { eventId, participanteId, asistencia } = req.body;

    if (!eventId || !participanteId || asistencia === undefined) {
        return res.status(400).json({ message: "Faltan datos obligatorios (eventId, participanteId, asistencia)" });
    }

    try {
        const eventRepository = AppDataSource.getRepository(EventEntity);
        const participantRepository = AppDataSource.getRepository(ActiveParticipantsEntity);
        const attendanceRepository = AppDataSource.getRepository(AttendanceEntity);

        const evento = await eventRepository.findOneBy({ id: eventId });
        if (!evento) {
        return res.status(404).json({ message: "El evento no existe" });
        }

        const participante = await participantRepository.findOneBy({ id: participanteId, activo: true });
        if (!participante) {
        return res.status(404).json({ message: "El participante no existe o no está activo" });
        }

        let asistenciaExistente = await attendanceRepository.findOne({
        where: {
            event: { id: eventId },
            participant: { id: participanteId },
        },
        });

        if (asistenciaExistente) {
            asistenciaExistente.asistencia = asistencia;
            asistenciaExistente.updatedAt = new Date();
            await attendanceRepository.save(asistenciaExistente);
            return res.status(200).json({ message: "Asistencia actualizada correctamente", data: asistenciaExistente });
        } else {
        const nuevaAsistencia = attendanceRepository.create({
            rut: participante.rut,
            nombre: participante.nombre,
            apellido: participante.apellido,
            asistencia,
            participant: participante,
            event: evento,
        });

        await attendanceRepository.save(nuevaAsistencia);
        return res.status(201).json({ message: "Asistencia registrada correctamente", data: nuevaAsistencia });
        }
    } catch (error) {
        console.error("Error al registrar asistencia:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}