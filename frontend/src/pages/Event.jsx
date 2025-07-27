import '@styles/event.css';
import { useEffect } from 'react';
import useEditEvent from '@hooks/eventsMeetings/useEditEvent';
import useGetEvent from '@hooks/eventsMeetings/useGetEvent';
import useDeleteEventById from '@hooks/eventsMeetings/useDeleteEvent';


const Event = () => {
    const { events, fetchEvents } = useGetEvent();
    const { handleEditEvent } = useEditEvent(fetchEvents);
    const { handleDeleteEvent } = useDeleteEventById(fetchEvents);
    
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        fetchEvents();
    },[]);

    console.log('eventos recibidos:', events);
    return (
        <div className="event-page"> 
            <h2>Eventos</h2>
            <table className="event-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Lugar</th>
                        <th>Tipo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(events) && events.length > 0 ? (
                        events.map((event) => (
                            <tr key={event.id}>
                                <td>{event.id}</td>
                                <td>{event.titulo}</td>
                                <td>{event.descripcion}</td>
                                <td>{event.fecha}</td>
                                <td>{event.hora}</td>
                                <td>{event.lugar}</td>
                                <td>{event.tipo}</td>
                                <td>
                                    <button className="edit" onClick={() => handleEditEvent(event.id, event)}>Editar</button>
                                    <button className="delete" onClick={() => handleDeleteEvent(event.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No hay eventos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Event;