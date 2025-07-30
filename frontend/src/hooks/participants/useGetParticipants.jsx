import { useState } from 'react';
import { GetParticipants } from '@services/participants.service.js';
export const useGetParticipants = () => {
    const [participants, setParticipants] = useState([]);
    
        const fetchParticipants = async () => {
            try {
                const data = await GetParticipants();
                setParticipants(data.data);
            } catch (error) {
                console.error("Error al obtener a los participantes:", error);
            }
        };

    return { participants,setParticipants, fetchParticipants };

}

export default useGetParticipants;