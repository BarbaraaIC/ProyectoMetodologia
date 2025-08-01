import axios from '@services/root.service.js';

export async function registerAttendance({ eventId, asistencias }) {
    try {
        const response = await axios.post("/attendance", {
        eventId,
        asistencias,
        });
        return response.data;
    } catch (error) {
        console.error("Error al registrar asistencia:", error);
        return null;
    }
}
