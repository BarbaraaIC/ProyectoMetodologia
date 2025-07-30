import { useState } from 'react';
import { GetParticipants} from '@services/participants.service.js';

export const useGetRutVotantes = () => {
    const [rutsVotantes, setRutVotantes] = useState ([]);
    
    const fetchRutVotantes = async () => {
        try{
            const data = await GetParticipants();
            setRutVotantes(data.data.map(p => p.rut));
        }catch(error){
            console.log("Error al obtener el rut del votante", error);
        }
    }

    return {rutsVotantes, fetchRutVotantes};
}

export default useGetRutVotantes;
