import axios from '@services/root.service.js';

export async function GetCandidatos(){
    try{
        const response = await axios.get('/votations/mostrarCandidatos');
        return response.data;
    } catch (error){
        console.error("Error al obtener candidatos", error);
    }
}