import axios from '@services/root.service.js';

export async function GetArchivo() {
    try {
        const response = await axios.get('/archivo');
        return response.data;
    } catch (error) {
        console.error('Error al obtener documento:', error);
    }
}