import Swal from "sweetalert2";
import { registerAttendance } from "@services/attendance.service.js";
import { addRegisterAttendance } from "@utils/addRegisterAttendance";
import { GetParticipants } from "@services/participants.service.js";

export const useRegisterAttendance = (fetchEvents) => {
    const { participants } = GetParticipants();

    const handleRegisterAttendance = async (eventId) => {
        try {
        const activeParticipants = participants;

        const asistencia = await addRegisterAttendance(activeParticipants);
        if (!asistencia) return;

        const response = await registerAttendance({ eventId, asistencias: asistencia });

        if (response) {
            Swal.fire({
            title: "Asistencia registrada con éxito",
            icon: "success",
            confirmButtonText: "Aceptar"
            });
            await fetchEvents?.(); 
        }

        } catch (error) {
        console.error("Error al registrar asistencia:", error);
        Swal.fire("Error", "No se pudo registrar la asistencia", "error");
        }
    };

    return { handleRegisterAttendance };
};

export default useRegisterAttendance;
