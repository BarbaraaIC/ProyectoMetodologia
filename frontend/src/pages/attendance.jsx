import '@styles/attendance.css';
import { useEffect } from 'react';
import useGetEvent from '@hooks/eventos/useGetEvent';
import useRegisterAttendance from '@hooks/attendance/useRegisterAttendance';

const Attendance = () => {
    const { events, fetchEvents } = useGetEvent();
    const { handleRegisterAttendance } = useRegisterAttendance(fetchEvents);

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="attendance-page">
        <h2>Asistencia</h2>
        <table className = "attendance-table">
            <thead>
            <tr>
                <th>Título</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Acción</th>
            </tr>
            </thead>
            <tbody>
            {Array.isArray(events) && events.length > 0 ? (
                events.map(event => (
                <tr key={event.id}>
                    <td>{event.titulo}</td>
                    <td>{event.fecha}</td>
                    <td>{event.hora}</td>
                    <td>
                    <button className = "asistencia" onClick={() => handleRegisterAttendance(event.id)}>Registrar asistencia</button>
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
        </div>
    );
};

export default Attendance;