import Swal from "sweetalert2";
import { deleteEventById } from "@services/event.service.js";

async function confirmDeleteEvent () {
    const result = await Swal.fire ({
        title: "¿Estás seguro?",
        text: "No podrás deshacer esta acción ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
    })
    return result.isConfirmed; 
}

async function confirmAlert() {
    await Swal.fire({
        title: "Evento eliminado",
        text: "El evento ha sido eliminado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
    });
}

async function confirmError() {
    await Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el evento",
        icon: "error",
        confirmButtonText: "Aceptar",
    });
}

export const useDeleteEventById = (fetchEvents) => {

    const handleDeleteEvent = async (id) => {
        try {
            const isConfirmed = await confirmDeleteEvent();
            if (isConfirmed) {
                const response = await deleteEventById(id);
                if (response) {
                    confirmAlert();
                    await fetchEvents();
                }
            }
        } catch (error) {
            console.error("Error al eliminar evento:", error);
            confirmError();
        }
    };
    return { handleDeleteEvent };
};

export default useDeleteEventById;