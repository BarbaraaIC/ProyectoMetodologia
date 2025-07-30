import Swal from "sweetalert2"
import { PostEmitirVoto} from "@services/listVotation.service.js";

async function addVotoPopup(){
    const {value: formValues } = await Swal.fire({
    title: "Emitir Voto",
    html: `
        <style>
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: .25rem; }
        </style>

        <div class="form-group">
        <label for="swal2-rut">Rut votante</label>
        <input id="swal2-rut" class="swal2-input" placeholder="Rut del votante">
        </div>

        <div class="form-group">
        <label for="swal2-rutCandidato">Rut candidato</label>
        <input id="swal2-rutCandidato" class="swal2-input" placeholder="Rut del candidato">
        </div>

        <div class="form-group">
        <label for="swal2-nombre">Nombre</label>
        <input id="swal2-nombre" class="swal2-input" placeholder="Nombre del candidato">
        </div>

        <div class="form-group">
        <label for="swal2-apellido">Apellido</label>
        <input id="swal2-apellido" class="swal2-input" placeholder="Apellido del candidato">
        </div>

        <div class="form-group">
        <label for="swal2-cargo">Cargo</label>
        <input id="swal2-cargo" class="swal2-input" placeholder="Cargo del candidato">
        </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Emitir",
    preConfirm: () => {
        const rut_votante = document.getElementById("swal2-rut").value ;
        const rut_candidato = document.getElementById("swal2-rutCandidato").value ;
        const nombre_candidato = document.getElementById("swal2-nombre").value ;
        const apellido_candidato = document.getElementById("swal2-apellido").value ;
        const cargo = document.getElementById("swal2-cargo").value ;

        if(!rut_votante|| !rut_candidato ||!nombre_candidato || !apellido_candidato || !cargo){
            Swal.showValidationMessage("Porfavor, Complete todos los campos");
            return false;
        }

        return {rut_votante, rut_candidato,nombre_candidato, apellido_candidato, cargo};
    }, 
    });
    if(formValues){
        return{
            rut_votante: formValues.rut_votante,
            rut_candidato: formValues.rut_candidato,
            nombre_candidato: formValues.nombre_candidato,
            apellido_candidato: formValues.apellido_candidato,
            cargo: formValues.cargo,
        };
    }

    return null; 
} 
export const usePostEmitirVoto = (fetchCandidatos, votosEmitidos) => {
    const handlePostEmitirVoto = async () => {
    try {
    const formValues = await addVotoPopup();
    if (!formValues) return;

    const { rut_votante } = formValues;
    
    const votosDelVotante = Array.isArray(votosEmitidos)
        ? votosEmitidos.filter(v => v.rut_votante === rut_votante)
        : [];

    if (votosDelVotante.length >= 3) {
        Swal.fire({
        title: "Límite de votos alcanzado",
        text: "No puedes emitir más de 3 votos.",
        icon: "warning",
        confirmButtonText: "Aceptar",
        });
        return; 
    }

    const response = await PostEmitirVoto(formValues);

    if (response) {
        Swal.fire({
        title: "Voto emitido exitosamente!",
        icon: "success",
        confirmButtonText: "Aceptar",
        });
        await fetchCandidatos();
    } else {
        Swal.fire({
        title: "Ya has votado!",
        icon: "error",
        confirmButtonText: "Aceptar",
        });
    }

    } catch (error) {
    console.error("Error al añadir el voto:", error);
    }
};

    return { handlePostEmitirVoto };
};


export default usePostEmitirVoto;


