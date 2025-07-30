import '@styles/event.css';
import { useEffect } from 'react';
import useGetEvent from '@hooks/eventos/useGetEvent';

const ViewEvent = () => {
    const { events, fetchEvents } = useGetEvent();
    
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        fetchEvents();
    },[]);

    return (
        <div className="event-page"> 
            <div className = "event-header">
                <h2>Eventos</h2>   
                </div>
            <table className="event-table">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Lugar</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(events) && events.length > 0 ? (
                        events.map((event) => (
                            <tr key={event.id}>
                                <td>{event.titulo}</td>
                                <td>{event.descripcion}</td>
                                <td>{event.fecha}</td>
                                <td>{event.hora}</td>
                                <td>{event.lugar}</td>
                                <td>{event.tipo}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No hay eventos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewEvent;