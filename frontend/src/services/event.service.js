import axios from '@services/root.service.js';

<<<<<<< HEAD
=======
//Obtener eventos
>>>>>>> f7aad9e897300538d62466b55206dbc40824e4aa
export async function getEvents() {
    try{
        const response = await axios.get('/event');
        return response.data.data;
    }catch(error){
        console.error("Error al obtener eventos: ", error);
    }
}
<<<<<<< HEAD

export async function getEventById(id) {
    try{
        const response = await axios.get(`/event/${id}`);
=======
/*
export async function getEventById(id) {
    try{
        const response = await axios.get(/event/${id});
>>>>>>> f7aad9e897300538d62466b55206dbc40824e4aa
        return response.data;
    }catch (error) {
        console.error('Error al obtener evento por Id: ', error);
    }
}
<<<<<<< HEAD

=======
*/
//Crear evento
>>>>>>> f7aad9e897300538d62466b55206dbc40824e4aa
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
<<<<<<< HEAD
        console.log('Actualizando evento:', id, data); // <-- log para depuración
        const response = await axios.put(`/event/${id}`,data);
        console.log('Respuesta backend:', response.data); // <-- log para depuración
=======
        console.log('Actualizando evento:', id, data); 
        const response = await axios.put(`/event/${id}`,data);
        console.log('Respuesta backend:', response.data); 
>>>>>>> f7aad9e897300538d62466b55206dbc40824e4aa
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