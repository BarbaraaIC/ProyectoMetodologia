import axios from '@services/root.service.js';
import { formatEventData } from '../helpers/formatData.helper';

export async function getEvents() {
    try{
        const { data } = await axios.get('/event');
        const formattedData = data.data.map(formatEventData);
        return formattedData;
    }catch(error){
        console.error("Error al obtener eventos: ", error);
    }
}

export async function createEvent(data) {
    try {
        const response = await axios.post('/event',data);
        return response.data;
    }catch(error) {
        console.error("Error al crear evento: ", error);
    }
}

export async function updateEventById(id, data) {
    try {
        console.log('Actualizando evento:', id, data); 
        const response = await axios.put(`/event/${id}`,data);
        console.log('Respuesta backend:', response.data); 
        return response.data;
    }catch(error){
        console.error("Error al actualizar evento: ", error);
    }
}

export async function deleteEventById(id) {
    try {
        const response = await axios.delete(`/event/${id}`);
        return response.data;
    }catch(error) {
        console.error("Error al eliminar evento: ", error);
    }
}