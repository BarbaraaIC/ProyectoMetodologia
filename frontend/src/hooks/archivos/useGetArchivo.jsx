import { useState } from "react";
import { GetArchivo } from "../../services/archivo.service.js";

export const useGetArchivo = () => {
    const [archivos, setArchivos] = useState([]);

    const fetchArchivos = async () => {
        try {
            const data = await GetArchivo();
            console.log('Aaarchivo data:', data);
            setArchivos(data);
        } catch (error) {
            console.error('Error obteniendo documento:', error);
        }
    }
    return { archivos, setArchivos, fetchArchivos };
}

export default useGetArchivo;