import { useState } from 'react';
import { getEvents } from "@services/event.service.js";

export const useGetEvent = () => { 
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        try {
            const data = await getEvents();
            setEvents(data);
        } catch (error) {
            console.error("Error al obtener eventos:", error);
        }
    };

    return { events, setEvents, fetchEvents };
}

export default useGetEvent;