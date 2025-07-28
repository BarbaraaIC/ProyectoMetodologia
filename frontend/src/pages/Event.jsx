import '@styles/event.css';
import { useEffect } from 'react';
import useEditEvent from '@hooks/eventos/useEditEvent';
import useGetEvent from '@hooks/eventos/useGetEvent';
import useDeleteEventById from '@hooks/eventos/useDeleteEvent';
import useCreateEvent from '@hooks/eventos/useCreateEvent';


const Event = () => {
    const { events, fetchEvents } = useGetEvent();
    const {handleCreateEvent}= useCreateEvent(fetchEvents);
    const { handleEditEvent } = useEditEvent(fetchEvents);
    const { handleDeleteEvent } = useDeleteEventById(fetchEvents);
    
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        fetchEvents();
    },[]);

    console.log('eventos recibidos:', events);
    return (
        <div className="event-page"> 
            <div className = "participants-header">
                <h2>Eventos</h2>   
                <button className="event-addbtn" onClick={()=> handleCreateEvent()}>Añadir</button>
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
                        <th>Acciones</th>
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
                                <td>
                                    <button className="edit" onClick={() => handleEditEvent(event.id, event)}>Editar</button>
                                    <button className="delete" onClick={() => handleDeleteEvent(event.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">No hay eventos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Event;