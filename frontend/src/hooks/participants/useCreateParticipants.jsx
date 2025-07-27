import Swal from "sweetalert2"
import { CreateParticipants } from "@services/participants.service.js";

async function addParticipantsPopup(){
    const {value: formValues } = await Swal.fire({
        title: "Añadir Participante",
        html:`
        <div>
        <label for = "swal2-rut">Rut</label>
        <input id = "swal2-rut" class="swal2-input" placeholder="Rut del participante">
        </div>
        <div>
        <label for = "swal2-nombre">Nombre</label>
        <input id = "swal2-nombre" class="swal2-input" placeholder="Nombre del participante">
        </div>
         <div>
        <label for = "swal2-apellido">Apellido</label>
        <input id = "swal2-apellido" class="swal2-input" placeholder="Apellido del participante">
        </div>
         <div>
        <label for = "swal2-email">Email</label>
        <input id = "swal2-email" class="swal2-input" placeholder="Email del participante">
        </div>
         <div>
        <label for = "swal2-password">Contraseña</label>
        <input id = "swal2-password" class="swal2-input" placeholder="Contraseña del participante">
        </div>
         <div>
        <label for = "swal2-cargo">Cargo</label>
        <input id = "swal2-cargo" class="swal2-input" placeholder="Cargo del participante">
        </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Añadir",
    preConfirm: () => {
        const rut = document.getElementById("swal2-rut").value ;
        const nombre = document.getElementById("swal2-nombre").value ;
        const apellido = document.getElementById("swal2-apellido").value ;
        const email = document.getElementById("swal2-email").value ;
        const password = document.getElementById("swal2-password").value;
        const cargo = document.getElementById("swal2-cargo").value ;

        if(!rut || !nombre || !apellido || !email || !cargo){
            Swal.showValidationMessage("Porfavor, Complete todos los campos");
            return false;
        }

        return {rut, nombre, apellido, email, password, cargo};
    }, 
    });
    if(formValues){
        return{
            rut: formValues.rut,
            nombre: formValues.nombre,
            apellido: formValues.apellido,
            email: formValues.email,
            password: formValues.password,
            cargo: formValues.cargo,
        };
    }

    return null; //si se cancela
} 
export const useCreateParticipants = (fetchParticipants) => {
    const handleCreateParticipants = async () => {
        try{
            const formValues = await addParticipantsPopup();
            if(!formValues) return;

            const response = await CreateParticipants(formValues);
            if(response) {
                Swal.fire({
                    title: "Participante añadido exitosamente!",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                })
                await fetchParticipants();
            }

        }catch(error){
        console.error ("Error al añadir al participante:", error);
        } 
    };   
    return {handleCreateParticipants}
};

export default useCreateParticipants;