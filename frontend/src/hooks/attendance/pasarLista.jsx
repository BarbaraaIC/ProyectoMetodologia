import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { registerAttendance } from "@services/attendance.service.js";
import { addRegisterAttendance } from "@utils/addRegisterAttendance";
import { GetParticipants } from "@services/participants.service.js";

const usePasarAsistencia = () => {
    const navigate = useNavigate();
    const { participants } = GetParticipants();

    const handlePasarAsistencia = async (eventId) => {
        try {
        const asistencia = await addRegisterAttendance(participants);
        if (!asistencia) return;

        const response = await registerAttendance({
            eventId: parseInt(eventId),
            asistencias: asistencia,
        });

        if (response) {
            await Swal.fire("¡Asistencia registrada!", "", "success");
            navigate("/asistencia"); 
        }
        } catch (error) {
        console.error("Error al registrar asistencia:", error);
        Swal.fire("Error", "No se pudo registrar la asistencia", "error");
        }
    };

    return { handlePasarAsistencia };
};

export default usePasarAsistencia;
