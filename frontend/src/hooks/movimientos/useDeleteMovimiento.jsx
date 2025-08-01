import { deleteMovimiento } from '@services/movimientos.service.js';
import Swal from "sweetalert2";


async function confirmDeleteMovimientos() {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás deshacer esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });
  return result.isConfirmed;
}

async function confirmAlert() {
  await Swal.fire({
    title: "Movimiento eliminado",
    text: "El Movimiento ha sido eliminado correctamente",
    icon: "success",
    confirmButtonText: "Aceptar",
  });
}

async function confirmError() {
  await Swal.fire({
    title: "Error",
    text: "No se pudo eliminar el movimiento",
    icon: "error",
    confirmButtonText: "Aceptar",
  });
}


export const useDeleteMovimiento = (fetchMovimientos) => {
    const handleDeleteMovimiento = async (movimientoId) => {
        try {
            const isConfirmed = await confirmDeleteMovimientos();
            if (isConfirmed){
             const response = await deleteMovimiento(movimientoId);
              if (response) {
                confirmAlert();
                await fetchMovimientos();
              } 
            }
        } catch (error) {
            console.error("Error al eliminar movimiento:", error);
            confirmError();
            }
        };

        return { handleDeleteMovimiento }
};

export default useDeleteMovimiento;