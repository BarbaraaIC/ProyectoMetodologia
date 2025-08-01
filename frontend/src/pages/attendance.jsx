import '@styles/attendance.css';
import { useEffect, useState } from 'react';
import useGetEvents from '@hooks/eventos/useGetEvent';
import useRegisterAttendance from '@hooks/attendance/useRegisterAttendance';
import { GetParticipants } from '@services/participants.service';

const Attendance = () => {
    const { events, fetchEvents } = useGetEvents();
    const { handleRegisterAttendance } = useRegisterAttendance();

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [participants, setParticipants] = useState([]); 
    const [attendanceData, setAttendanceData] = useState({});

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        fetchEvents();
    }, []);

    const handleRegisterClick = async (eventId, event) => {
    setSelectedEvent(event);
        try {
            const response = await GetParticipants();
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

    const handleSaveAttendance = async () => {
        const asistencias = participants.map((p) => ({
        participanteId: p.id,
        asistencia: attendanceData[p.id] === 'presente', 
        }));

        const dataToSend = {
        eventId: selectedEvent.id,
        asistencias,
        };

        try {
        const response = await handleRegisterAttendance (dataToSend);
        if (response) {
            alert('Asistencia registrada correctamente');
            setSelectedEvent(null); 
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
                <h2>Asistencia</h2>
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
                                <button onClick={() => handleRegisterClick(event.id, event)}>Lista Asistencia</button>
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
                <div className="attendance-page">
                    <div className = "attendance-header">
                        <h2>Asistencia {selectedEvent.titulo}</h2>   
                            <button className="Guardar" onClick={handleSaveAttendance}>Guardar Asistencia</button>
                    </div>
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Rut</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Asistencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(participants) && participants.length > 0 ? (
                                participants.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.rut}</td>
                                    <td>{p.nombre}</td>
                                    <td>{p.apellido}</td>
                                    <td>
                                    <select onChange={(e) => handleAttendanceChange(p.id, e.target.value)}
                                        value={attendanceData[p.id] || ''}>
                                        <option value="">Seleccionar</option>
                                        <option value="presente">Presente</option>
                                        <option value="ausente">Ausente</option>
                                    </select>
                                    </td>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                <td colSpan="4">No hay participantes disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Attendance;
