import { AppDataSource } from "../config/configDb.js";
import Attendance from "../entity/attendance.entity.js";
import Participants from "../entity/activeParticipants.entity.js";
import Event from "../entity/event.entity.js";

// Registrar asistencia para un evento/reunión
export async function registerAttendance(req, res) {
    try {
        const attendanceRepo = AppDataSource.getRepository(Attendance);
        const participantRepo = AppDataSource.getRepository(Participants);
        const eventRepo = AppDataSource.getRepository(Event);

        const { eventId, asistencia } = req.body;
        // asistencia: [{ participantId, presente }, ...]

        // Verificar que el evento/reunión exista
        const event = await eventRepo.findOne({ where: { id: eventId } });
        if (!event) {
        return res.status(404).json({ message: "Evento o reunión no encontrado" });
        }

        // Obtener solo participantes activos para validar
        const activeParticipantIds = (await participantRepo.find({ where: { activo: true } })).map(p => p.id);

        // Validar que los participantes enviados estén activos
        const invalidParticipants = asistencia.filter(a => !activeParticipantIds.includes(a.participantId));
        if (invalidParticipants.length > 0) {
            return res.status(400).json({ message: "Algunos participantes no están activos y no se puede registrar su asistencia." });
        }

        // Guardar o actualizar asistencia para cada participante
        for (const item of asistencia) {
            let attendance = await attendanceRepo.findOne({
                where: { participant: { id: item.participantId }, event: { id: eventId } },
            });

            if (!attendance) {
                attendance = attendanceRepo.create({
                participant: { id: item.participantId },
                event: { id: eventId },
                presente: item.presente,
                });
            } else {
                attendance.presente = item.presente;
            }

            await attendanceRepo.save(attendance);
        }

        res.status(200).json({ message: "Asistencia registrada exitosamente" });
    } catch (error) {
    console.error("Error al registrar asistencia:", error);
    res.status(500).json({ message: "Error interno del servidor" });
    }
}