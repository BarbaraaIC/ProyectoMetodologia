import { postulateParticipant } from "@services/participants.service.js";
import Swal from "sweetalert2";

async function PostulationAlert() {
  const { value: selectedCargo } = await Swal.fire({
    title: "Postular participante",
    input: "select",
    inputOptions: {
      Presidente: "Presidente",
      Secretario: "Secretario",
      Tesorero: "Tesorero",
      Vecino: "Vecino",
    },
    inputPlaceholder: "Selecciona un cargo",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) return "Debes seleccionar un cargo";
    },
  });

  return selectedCargo ? { cargo: selectedCargo } : null;
}

export function usePostulateParticipant(fetchParticipants) {
  const handlePostulateParticipant = async (participantId) => {
    try {
      const formValues = await PostulationAlert();
      if (!formValues) return;

      const response = await postulateParticipant(participantId, formValues);
      if (response) {
        await Swal.fire({
          title: "Postulación exitosa",
          text: `Participante postulado a ${formValues.cargo}`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        await fetchParticipants();
      }
    } catch (error) {
      console.error("Error al postular participante:", error);
    }
  };

  return { handlePostulateParticipant };
}

export default usePostulateParticipant;