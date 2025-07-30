import { useState } from 'react';
import { GetMovimientos } from '@services/movimientos.service.js';

export const useGetMovimientos = () => {
    const [movimientos, setMovimientos] = useState([]);

    const fetchMovimientos = async () => {
        try {
            const data = await GetMovimientos();
            setMovimientos(data.data);
        } catch (error) {
            console.error("Error consiguiendo los movimientos:", error);
        }
    };

    return { movimientos, setMovimientos, fetchMovimientos };
}


export default useGetMovimientos;