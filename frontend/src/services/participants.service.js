import axios from '@services/root.service.js';


export async function GetParticipants() {
    try {
        const response = await axios.get('/participants');
        return response.data;
    } catch (error) {
        console.error("Error al obtener los Participantes:", error);
    }
}

export async function DeleteParticipants(participantId){
    try{
    const response = await axios.delete(`/participants/${participantId}`);
    return response.data;
    }catch (error) {
        console.error("Error al eliminar al participante", error);
    }
}

export async function EditParticipants(participantId,participantData){
    try{
        const response = await axios.put(`/participants/${participantId}`, participantData);
        return response.data;
    }catch (error){
        console.error("Error al editar Participante", error);
    }
}

