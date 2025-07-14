"use strict";

import { AppDataSource } from "../config/configDb.js";
import Attendance from "../entity/attendance.entity.js";
import Participants from "../entity/activeParticipants.entity.js";
import Event from "../entity/event.entity.js";

// Registrar asistencia para un evento/reunión
export async function registerAttendance(req, res) {
    try {
        const attendanceRepository = AppDataSource.getRepository(Attendance);
        const participantRepository = AppDataSource.getRepository(Participants);
        const eventRepository = AppDataSource.getRepository(Event);

        const { eventId, asistencia } = req.body;
        // asistencia: [{ participantId, presente }, ...]

        // Verificar que el evento/reunión exista
        const event = await eventRepository.findOne({ where: { id: eventId } });
        if (!event) {
            return res.status(404).json({ message: "Evento o reunión no encontrado" });
        }

        // Obtener solo participantes activos
        const activeParticipantIds = (
            await participantRepository.find({ where: { activo: true } })
        ).map(p => p.id);

        // Validar que los participantes enviados estén activos
        const invalidParticipants = asistencia.filter(
            a => !activeParticipantIds.includes(a.participantId)
        );

        if (invalidParticipants.length > 0) {
            return res.status(400).json({
                message: "Algunos participantes no están activos y no se puede registrar su asistencia.",
            });
        }

        // Guardar o actualizar asistencia para cada participante
        for (const item of asistencia) {
            let attendance = await attendanceRepository.findOne({
                where: {
                    participants: { id: item.participantId },
                    event: { id: eventId },
                },
            });

            if (!attendance) {
                attendance = attendanceRepository.create({
                    participants: { id: item.participantId },
                    event: { id: eventId },
                    asistencia: item.presente, // ← campo corregido según tu entity
                });
            } else {
                attendance.asistencia = item.presente;
            }

            await attendanceRepository.save(attendance);
        }

        res.status(200).json({ message: "Asistencia registrada exitosamente" });
    } catch (error) {
        console.error("Error al registrar asistencia:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
