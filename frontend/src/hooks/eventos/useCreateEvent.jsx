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

        <div style="margin-top:1em">
            <label>
            <input type="checkbox" id="swal2-votacion" />
            Incluir votación
            </label>
        </div>

        <label>Duración votación (hrs)</label>
        <input id="swal2-duracion" type="number" min="1" class="swal2-input" placeholder="Ej: 24">
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
    const votacion = document.getElementById("swal2-votacion").checked;
    const durRaw = document.getElementById("swal2-duracion").value;

        if (!titulo || !descripcion || !fecha || !hora || !lugar || !tipo) {
            Swal.showValidationMessage("Por favor completa todos los campos");
            return false;
        }
        if (votacion && (!durRaw || parseInt(durRaw, 10) < 1)) {
            Swal.showValidationMessage("Duración de votación inválida (mínimo 30min)");
            return false;
        }

        return {
            titulo, descripcion, fecha,  hora,  lugar, tipo,  votacion,  duracionVotacion: votacion ? parseInt(durRaw, 10) : null
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
