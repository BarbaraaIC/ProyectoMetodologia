import '@styles/attendance.css';
import { useEffect, useState } from 'react';
import useGetEvents from '@hooks/eventos/useGetEvent';
import useRegisterAttendance from '@hooks/attendance/useRegisterAttendance';
import { GetParticipants } from '@services/participants.service';

const Attendance = () => {
    const { events, fetchEvents } = useGetEvents();
    const { submitAttendance } = useRegisterAttendance();

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [participants, setParticipants] = useState([]); // Inicializado vacío
    const [attendanceData, setAttendanceData] = useState({});

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        fetchEvents();
    }, []);

    const handleRegisterClick = async (eventId, event) => {
    setSelectedEvent(event);
        try {
            const response = await GetParticipants();
            // response es el objeto con { message, data: [...] }
            if (response && Array.isArray(response.data)) {
            setParticipants(response.data);
            } else {
            setParticipants([]);
            console.error('La respuesta no contiene un array en data:', response);
            }
            setAttendanceData({});
        } catch (error) {
            console.error('Error al cargar participantes:', error);
            setParticipants([]);
        }
    };

    const handleAttendanceChange = (participantId, value) => {
        setAttendanceData((prev) => ({
        ...prev,
        [participantId]: value,
        }));
    };

    const handleSubmit = async () => {
        const asistencias = participants.map((p) => ({
        participanteId: p.id,
        asistencia: attendanceData[p.id] === 'presente',
        }));

        const dataToSend = {
        eventId: selectedEvent.id,
        asistencias,
        };

        try {
        const response = await submitAttendance(dataToSend);
        if (response) {
            alert('Asistencia registrada correctamente');
            setSelectedEvent(null); // oculta el formulario después de guardar
        } else {
            alert('Error al registrar la asistencia');
        }
        } catch (error) {
        alert('Error al registrar la asistencia');
        console.error(error);
        }
    };

    return (
        <div className="attendance-page">
        <div className="attendance-header">
            <h2>Registro de Asistencia</h2>
        </div>

        <table className="attendance-table">
            <thead>
            <tr>
                <th>Evento</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Acción</th>
            </tr>
            </thead>
            <tbody>
            {Array.isArray(events) && events.length > 0 ? (
                events.map((event) => (
                <tr key={event.id}>
                    <td>{event.titulo}</td>
                    <td>{event.fecha}</td>
                    <td>{event.hora}</td>
                    <td>
                    <button onClick={() => handleRegisterClick(event.id, event)}>
                        Lista Asistencia
                    </button>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan="4">No hay eventos disponibles</td>
                </tr>
            )}
            </tbody>
        </table>

        {selectedEvent && (
            <div className="attendance-form">
            <h3>Asistencia para: {selectedEvent.titulo}</h3>
            <table className="attendance-table">
                <thead>
                <tr>
                    <th>Participante</th>
                    <th>Asistencia</th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(participants) && participants.length > 0 ? (
                    participants.map((p) => (
                    <tr key={p.id}>
                        <td>{p.nombre} {p.apellido}</td>
                        <td>
                        <select
                            onChange={(e) =>
                            handleAttendanceChange(p.id, e.target.value)
                            }
                            value={attendanceData[p.id] || ''}
                        >
                            <option value="">Seleccionar</option>
                            <option value="presente">Presente</option>
                            <option value="ausente">Ausente</option>
                        </select>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="2">No hay participantes disponibles</td>
                    </tr>
                )}
                </tbody>
            </table>
            <button onClick={handleSubmit}>Guardar Asistencia</button>
            </div>
        )}
        </div>
    );
};

export default Attendance;
