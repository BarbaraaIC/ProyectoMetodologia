import { AppDataSource } from "../config/configDb.js";
import Participants from "../entity/activeParticipants.entity.js";
import Event from "../entity/event.entity.js";
import Attendance from "../entity/attendance.entity.js";

export async function getActiveParticipantsForAttendance(req, res) {
    try {
        const eventId = req.query.eventId;
        if (!eventId) {
            return res.status(400).json({ message: "Debe especificar el eventId como parámetro de consulta (query)." });
        }

        const eventRepository = AppDataSource.getRepository(Event);
        const participantRepository = AppDataSource.getRepository(Participants);
        const attendanceRepository = AppDataSource.getRepository(Attendance);

        // Verificar que el evento exista
        const event = await eventRepository.findOne({ where: { id: Number(eventId) } });
        if (!event) {
        return res.status(404).json({ message: "Evento no encontrado. Cree un evento antes de pasar lista." });
        }

        // Obtener participantes activos
        const activeParticipants = await participantRepository.find({ where: { activo: true } });

        // Obtener asistencias de esos participantes en este evento
        const Attendance = await attendanceRepository.find({
        where: { 
            event: { id: Number(eventId) }
        },
        relations: ["participant"] 
        });
        const attendanceData = await attendanceRepository
        .createQueryBuilder("attendance")
        .leftJoinAndSelect("attendance.participant", "participant")
        .where("attendance.eventId = :eventId", { eventId: Number(eventId) })
        .getMany();

        // Armar la respuesta combinando participantes con asistencia
        const response = activeParticipants.map((participant) => {
        const attendance = attendanceData.find(
            (a) => a.participant.id === participant.id
        );
        return {
            participantId: participant.id,
            rut: participant.rut,
            nombre: participant.nombre,
            apellido: participant.apellido,
            asistencia: attendance ? attendance.asistencia : false,
            attendanceId: attendance ? attendance.id : null,
        };
        });

        res.status(200).json({
        message: `Lista de participantes activos para el evento "${event.titulo}"`,
        data: response,
        });
    } catch (error) {
        console.error("Error en getActiveParticipantsForAttendance():", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}

export async function updateAttendance(req, res) {
    try {
        const { participantId, eventId, asistencia } = req.body;

        if (
        participantId === undefined ||
        eventId === undefined ||
        asistencia === undefined
        ) {
        return res.status(400).json({
            message: "Debe enviar participantId, eventId y asistencia en el body.",
        });
        }

        const participantRepository = AppDataSource.getRepository(Participants);
        const eventRepository = AppDataSource.getRepository(Event);
        const attendanceRepository = AppDataSource.getRepository(Attendance);

        // Verificar participante activo
        const participant = await participantRepository.findOne({
        where: { id: participantId, activo: true },
        });
        if (!participant) {
        return res
            .status(404)
            .json({ message: "Participante no encontrado o no está activo." });
        }

        // Verificar que el evento exista
        const event = await eventRepository.findOne({ where: { id: eventId } });
        if (!event) {
        return res.status(404).json({ message: "Evento no encontrado." });
        }

        // Buscar si ya existe asistencia para ese participante y evento
        let attendance = await attendanceRepository.findOne({
        where: { participant: { id: participantId }, event: { id: eventId } },
        relations: ["participant", "event"],
        });

        if (attendance) {
        // Actualizar asistencia
        attendance.asistencia = asistencia;
        } else {
        // Crear nuevo registro de asistencia
        attendance = attendanceRepository.create({
            asistencia,
            participant,
            event,
        });
        }

        const savedAttendance = await attendanceRepository.save(attendance);

        res.status(200).json({
        message: "Estado de asistencia actualizado exitosamente.",
        data: savedAttendance,
        });
    } catch (error) {
        console.error("Error en updateAttendance():", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}
