import { useState } from 'react';
import  { getEvents } from "@services/event.service.js";

export const useGetEvent = () => { 
    const [events, setEvents] = useState([]);
    
    const fetchEvents = async () => {
        try {
            const data = await getEvents();
            const filteredData = dataLogged(data);
            setEvents(filteredData);
        } catch (error) {
            console.error("Error al obtener eventos:", error);
        }
    };
    
    const dataLogged = (data) => {
        try {
            const { id } = JSON.parse(sessionStorage.getItem("evento"));
            return data.filter(ev => ev.rut !== id);
        } catch (error) {
            console.error("Error procesando datos de eventos:", error);
            return data;
        }
    }

    return { events, setEvents, fetchEvents };
}

export default useGetEvent;