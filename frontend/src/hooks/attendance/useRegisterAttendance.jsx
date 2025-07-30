import { useState } from 'react';
import { registerAttendance } from '@services/attendance.service';

const useRegisterAttendance = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRegisterAttendance = async (attendanceData) => {
        setLoading(true);
        setError(null);

        try {
        const response = await registerAttendance(attendanceData);
        return response;
        } catch (err) {
        console.error('Error al registrar asistencia:', err);
        setError(err);
        } finally {
        setLoading(false);
        }
    };

    return { handleRegisterAttendance, loading, error };
};

export default useRegisterAttendance;
