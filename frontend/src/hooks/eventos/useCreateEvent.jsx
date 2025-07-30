import Swal from "sweetalert2";
import { createEvent } from "@services/event.service.js";

async function addCreateEvent() {
    const { isConfirmed, value } = await Swal.fire({
        title: "Añadir evento",
        html: `
        <label>Título</label>
        <input id="swal2-titulo" class="swal2-input" placeholder="Título del evento">

        <label>Descripción</label>
        <input id="swal2-descripcion" class="swal2-input" placeholder="Descripción">

        <label>Fecha</label>
        <input id="swal2-fecha" type="date" class="swal2-input">

        <label>Hora</label>
        <input id="swal2-hora" type="time" class="swal2-input">

        <label>Lugar</label>
        <input id="swal2-lugar" class="swal2-input" placeholder="Lugar del evento">

        <label>Tipo</label>
        <input id="swal2-tipo" class="swal2-input" placeholder="evento o reunión">

    >
        `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Añadir",
    preConfirm: () => {
    const titulo = document.getElementById("swal2-titulo").value;
    const descripcion = document.getElementById("swal2-descripcion").value;
    const fecha = document.getElementById("swal2-fecha").value;
    const hora  = document.getElementById("swal2-hora").value;
    const lugar = document.getElementById("swal2-lugar").value;
    const tipo  = document.getElementById("swal2-tipo").value;

        if (!titulo || !descripcion || !fecha || !hora || !lugar || !tipo) {
            Swal.showValidationMessage("Por favor completa todos los campos");
            return false;
        }

        return {
            titulo, descripcion, fecha,  hora,  lugar, tipo 
        };
        }
    });

    if (!isConfirmed || !value) {
        return null;
    }
    return value;
    }

    export const useCreateEvent = (fetchEvents) => {
    const handleCreateEvent = async () => {
        try {
        const formValues = await addCreateEvent();
        if (!formValues) {
            return;
        }

        await createEvent(formValues);

        await Swal.fire({
            title: "Evento creado exitosamente!",
            icon: "success",
            confirmButtonText: "Aceptar"
        });
        await fetchEvents();
        } catch (error) {
        console.error("Error al crear un evento:", error);
        Swal.fire({
            title: "Error",
            icon: "error"
        });
        }
    };

    return { handleCreateEvent };
    };

    export default useCreateEvent;