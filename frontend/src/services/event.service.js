import axios from '@services/root.service.js';

export async function getEvents() {
    try{
        const response = await axios.get('/event');
        return response.data.data;
    }catch(error){
        console.error("Error al obtener eventos: ", error);
    }
}

export async function getEventById(id) {
    try{
        const response = await axios.get(`/event/${id}`);
        return response.data;
    }catch (error) {
        console.error('Error al obtener evento por Id: ', error);
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
        console.log('Actualizando evento:', id, data); // <-- log para depuración
        const response = await axios.put(`/event/${id}`,data);
        console.log('Respuesta backend:', response.data); // <-- log para depuración
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