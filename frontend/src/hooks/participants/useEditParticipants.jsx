import   { EditParticipants }   from "@services/participants.service.js";
import Swal from "sweetalert2";


async function EditParticipantsAlert(){
    const { value: participantCargo } = await Swal.fire({
        title: "Editar participante",
        text: "Editar Cargo",
        input: "text",
        inputLabel: "Ingrese nuevo cargo del participante",
        showCancelButton: true,
        inputValidator: (value) =>{
            if(!value){
                return "Completa el campo "
            }
        }
    })
    if (participantCargo)
        return {cargo: participantCargo};
}


export const useEditParticipants = (fetchParticipants) => {
    const handleEditParticipants = async (participantId) => {
        try{
            const  participantCargo  = await EditParticipantsAlert();
            if (participantCargo) {
                const response = await EditParticipants(participantId,participantCargo)
                if (response) {
                     Swal.fire({
                                        title: "Cargo modificado exitosamente!",
                                        icon: "success",
                                        confirmButtonText: "Aceptar",
                                    })
                    await fetchParticipants();
                }
            }
        }catch (error){
            console.error( "Error al editar al participante", error);
        }
    };
    return { handleEditParticipants };
};


export default useEditParticipants; 