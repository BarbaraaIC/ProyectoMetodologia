"use strict";

import { AppDataSource } from "../config/configDb.js";
import Attendance from "../entity/attendance.entity.js";
import Participants from "../entity/activeParticipants.entity.js";
import Event from "../entity/event.entity.js";

export async function getActiveNeighbors(req, res) {
    try {
        const participantRepo = AppDataSource.getRepository(Participants);
        const activeParticipants = await participantRepo.find({
        where: { activo: true },
        });

        res.status(200).json(activeParticipants);
    } catch (error) {
        console.error("Error al obtener vecinos activos:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
    }

export async function getAllEvents(req, res) {
    try {
        const eventRepo = AppDataSource.getRepository(Event);
        const events = await eventRepo.find();

        res.status(200).json(events);
    } catch (error) {
        console.error("Error al obtener eventos:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
    }

export async function registerAttendance(req, res) {
    const { eventId, listaAsistencia } = req.body;

    if (!eventId || !Array.isArray(listaAsistencia)) {
        return res.status(400).json({ message: "Datos inválidos" });
    }

    const attendanceRepo = AppDataSource.getRepository(Attendance);
    const eventRepo = AppDataSource.getRepository(Event);
    const participantRepo = AppDataSource.getRepository(Participants);

    try {
        const event = await eventRepo.findOneBy({ id: parseInt(eventId) });
        if (!event) {
        return res.status(404).json({ message: "Evento no encontrado" });
        }

        for (const registro of listaAsistencia) {
        const participant = await participantRepo.findOneBy({ id: registro.participantId });
        if (!participant || !participant.activo) continue;

        if (registro.asistenciaId) {
            // Actualizar existente
            let existing = await attendanceRepo.findOneBy({ id: registro.asistenciaId });
            if (existing) {
            existing.asistencia = registro.presente;
            await attendanceRepo.save(existing);
            }
        } else {
            // Crear nuevo
            const nuevo = attendanceRepo.create({
            asistencia: registro.presente,
            participant,
            event,
            });
            await attendanceRepo.save(nuevo);
        }
        }

        res.status(200).json({ message: "Lista de asistencia registrada correctamente" });
    } catch (error) {
        console.error("Error al registrar asistencia:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export async function getAttendanceByEvent(req, res) {
    const { eventId } = req.params;

    const attendanceRepo = AppDataSource.getRepository(Attendance);

    try {
        const registros = await attendanceRepo.find({
        where: {
            event: { id: parseInt(eventId) },
        },
        relations: ["participant", "event"],
        });

        res.status(200).json(registros);
    } catch (error) {
        console.error("Error al obtener asistencia:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

