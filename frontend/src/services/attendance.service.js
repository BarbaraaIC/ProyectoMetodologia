import axios from '@services/root.service.js';

export const getActiveParticipants = async () => {
    try {
        const response = await axios.get("/participants");
        return response.data;
    } catch (error) {
        console.error("Error al obtener participantes", error);
        return [];
    }
};

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
