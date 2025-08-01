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
        } catch (error) {
        console.error('Error al registrar asistencia:', error);
        setError(error);
        } finally {
        setLoading(false);
        }
    };

<<<<<<< HEAD
    return { handleRegisterAttendance , loading, error };
=======
    return { handleRegisterAttendance, loading, error };
>>>>>>> fa4eb504283f9a1e0bf13fda225c2bda0f12046b
};

export default useRegisterAttendance;
