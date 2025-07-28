import { useState } from 'react';
import { GetCandidatos } from '@services/listVotation.service.js';

export const useGetCandidatos = () => {
    const [candidatos, setCandidatos] = useState ([]);

    const fetchCandidatos = async () => {
        try{
            const data = await GetCandidatos();
            console.log(data)
            setCandidatos(data.candidatos);
        } catch (error){
            console.error ("Error al obtener los candidatos:", error);
        }
    };

    return { candidatos, setCandidatos, fetchCandidatos};
}

export default useGetCandidatos;