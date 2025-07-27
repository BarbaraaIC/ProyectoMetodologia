import { DeleteParticipants } from "@services/participants.service.js";
import Swal from "sweetalert2";

async function confirmDeleteParticipants() {
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
    title: "Participante eliminado",
    text: "El Participante ha sido eliminado correctamente",
    icon: "success",
    confirmButtonText: "Aceptar",
  });
}

async function confirmError() {
  await Swal.fire({
    title: "Error",
    text: "No se pudo eliminar al",
    icon: "error",
    confirmButtonText: "Aceptar",
  });
}

export const useDeleteParticipants = (fetchParticipants) => {
  const handleDeleteParticipants = async (ParticipantId) => {
    try {
      const isConfirmed = await confirmDeleteParticipants();
      if (isConfirmed) {
        const response = await DeleteParticipants(ParticipantId);
        if (response) {
          confirmAlert();
          await fetchParticipants();
        }
      }
    } catch (error) {
      console.error("Error al eliminar participante:", error);
      confirmError();
    }
  };

    return { handleDeleteParticipants };
};

export default useDeleteParticipants;