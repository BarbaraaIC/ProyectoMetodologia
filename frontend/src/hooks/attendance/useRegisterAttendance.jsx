import Swal from "sweetalert2";
import { registerAttendance } from "@services/attendance.service.js";
import { GetParticipants } from "@services/participants.service.js";

export const useRegisterAttendance = (fetchEvents) => {
    const { participants } = GetParticipants();

    const handleRegisterAttendance = async (eventId) => {
        try {
            if (!participants?.length) {
                Swal.fire("No hay participantes disponibles", "", "info");
                return;
            }

            const activeParticipants = participants.filter(p => p.isActive);

            if (!activeParticipants.length) {
                Swal.fire("No hay participantes activos", "", "info");
                return;
            }

            const asistencias = activeParticipants.map(participant => ({
                participantId: participant.id,
                timestamp: new Date()
            }));

            const response = await registerAttendance({
                eventId,
                asistencias
            });

            if (response?.success || response?.status === 200) {
                Swal.fire({
                title: "Asistencia registrada con éxito",
                icon: "success",
                confirmButtonText: "Aceptar"
                });
                await fetchEvents?.();
            } else {
                throw new Error("No se recibió confirmación del servidor");
            }

        } catch (error) {
            console.error("Error al registrar asistencia:", error);
            Swal.fire("Error", "No se pudo registrar la asistencia", "error");
        }
    };

    return { handleRegisterAttendance };
};

export default useRegisterAttendance;
