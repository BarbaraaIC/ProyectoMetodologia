import Swal from "sweetalert2"
import { createEvent } from "@services/event.service.js";

async function addCreateEvent(){
    const {value: formValues } = await Swal.fire({
        title: "Añadir evento",
        html:`
        <div>
        <label for="swal2-titulo">Titulo</label>
        <input id="swal2-titulo" class="swal2-input" placeholder="Titulo del evento o reunion">
        </div>
        <div>
        <label for="swal2-descripcion">Descripcion</label>
        <input id="swal2-descripcion" class="swal2-input" placeholder="Descripcion del evento o reunion">
        </div>
        <div>
        <label for="swal2-fecha">Fecha</label>
        <input id="swal2-fecha" class="swal2-input" placeholder="Formato YYYY-MM-DD">
        </div>
        <div>
        <label for="swal2-hora">Hora</label>
        <input id="swal2-hora" class="swal2-input" placeholder="Formato HH:MM">
        </div>
        <div>
        <label for="swal2-lugar">Lugar</label>
        <input id="swal2-lugar" class="swal2-input" placeholder="Lugar o direccion">
        </div>
        <div>
        <label for="swal2-tipo">Tipo</label>
        <input id="swal2-tipo" class="swal2-input" placeholder="evento o reunion">
        </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Añadir",
        preConfirm: () => {
            const titulo = document.getElementById("swal2-titulo").value ;
            const descripcion = document.getElementById("swal2-descripcion").value ;
            const fecha = document.getElementById("swal2-fecha").value ;
            const hora = document.getElementById("swal2-hora").value ;
            const lugar = document.getElementById("swal2-lugar").value;
            const tipo = document.getElementById("swal2-tipo").value ;

            if(!titulo || !descripcion || !fecha || !hora || !lugar|| !tipo){
                Swal.showValidationMessage("Porfavor, Complete todos los campos");
                return false;
            }

            return {titulo, descripcion, fecha, hora, lugar, tipo};
        }, 
    });
    if(formValues){
        return{
            titulo: formValues.titulo,
            descripcion: formValues.descripcion,
            fecha: formValues.fecha,
            hora: formValues.hora,
            lugar: formValues.lugar,
            tipo: formValues.tipo,
        };
    }

    return null; 
} 
export const useCreateEvent = (fetchEvents) => {
    const handleCreateEvent = async () => {
        try{
            const formValues = await addCreateEvent();
            if(!formValues) return;

            const response = await createEvent(formValues);
            if(response) {
                Swal.fire({
                    title: "Evento creado exitosamente!",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                })
                await fetchEvents();
            }

        }catch(error){
        console.error ("Error al crear un evento:", error);
        } 
    };   
    return {handleCreateEvent}
};

export default useCreateEvent;