import axios from '@services/root.service.js';
import { formatArchiveData } from '../helpers/formatData';

export async function GetArchivo() {
    try {
        const { data } = await axios.get('/archivo');
        const formattedData = data.data.map(formatArchiveData);
        return formattedData;
    } catch (error) {
        console.error('Error al obtener documento:', error);
    }
}

export async function createArchivo(archivoData) {
    try{
        const response = await axios.post('/archivo', archivoData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear un nuevo archivo:", error);
    }   
    
}