import { deleteMovimiento } from '@services/movimientos.service.js';
import Swal from "sweetalert2";


export const useDeleteMovimiento = (fetchMovimientos) => {
    const handleDeleteMovimiento = async (movimientoId) => {
        try {
            const response = await deleteMovimiento(movimientoId);
            if (response) {
                Swal.fire({
                    title: "Movimiento eliminado",
                    text: "El movimiento ha sido eliminado correctamente",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                });
                await fetchMovimientos();
            }
        } catch (error) {
            console.error("Error al eliminar movimiento:", error);
        }
        };

        return { handleDeleteMovimiento }
};

export default useDeleteMovimiento;