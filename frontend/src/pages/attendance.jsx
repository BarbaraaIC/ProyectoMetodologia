import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getEvents } from "@services/event.service";
import { GetParticipants } from "@services/participants.service";
import { registerAttendance } from "@services/attendance.service.js";

const AttendancePage = () => {
    const [events, setEvents] = useState([]);
    const { participants } = GetParticipants();

    const fetchEvents = async () => {
        const data = await getEvents();
        setEvents(data);
    };

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

        const response = await registerAttendance({ eventId, asistencias });

        if (response?.success || response?.status === 200) {
            Swal.fire({
            title: "Asistencia registrada con éxito",
            icon: "success",
            confirmButtonText: "Aceptar"
            });
            await fetchEvents();
        } else {
            throw new Error("No se recibió confirmación del servidor");
        }

        } catch (error) {
        console.error("Error al registrar asistencia:", error);
        Swal.fire("Error", "No se pudo registrar la asistencia", "error");
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
        <h2>Registro de Asistencia</h2>
        {events.map(event => (
            <div key={event.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
            <h3>{event.name}</h3>
            <p>{new Date(event.date).toLocaleString()}</p>
            <button onClick={() => handleRegisterAttendance(event.id)}>
                Registrar Asistencia
            </button>
            </div>
        ))}
        </div>
    );
};

export default AttendancePage;
