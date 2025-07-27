import Swal from "sweetalert2";
import { updateEventById } from "@services/event.service.js";

async function showEditEventModal(event) {
    const { value: formValues } = await Swal.fire({
        title: "Actualizar evento",
        html: `
            <div>
            <label for="swal2-input1">Titulo del evento</label>  
            <input id="swal2-input1" class="swal2-input" placeholder="Titulo del evento" value = "${event.titulo}">
            </div>

            <div>
            <label for="swal2-input2">Descripción</label>
            <input id="swal2-input2" class="swal2-input" placeholder="Descripción" value = "${event.descripcion}">
            </div>

            <div>
            <label for="swal2-input3">Fecha</label>  
            <input id="swal2-input3" class="swal2-input" placeholder="Fecha" value = "${event.fecha}">
            </div>

            <div>
            <label for="swal2-input4">Hora</label>
            <input id="swal2-input4" class="swal2-input" placeholder="Hora" value = "${event.hora}">
            </div>

            <div>
            <label for="swal2-input5">Tipo</label>  
            <input id="swal2-input5" class="swal2-input" placeholder="Tipo" value = "${event.tipo}">
            </div>`,

        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Editar",
        preConfirm: () => {
        const titulo = document.getElementById("swal2-input1").value;
        const descripcion = document.getElementById("swal2-input2").value;
        const fecha = document.getElementById("swal2-input3")?.value;
        const hora = document.getElementById("swal2-input4")?.value;
        const tipo = document.getElementById("swal2-input5")?.value;

        if (!titulo || !descripcion || !fecha || !hora || !tipo) {
            Swal.showValidationMessage("Por favor, completa todos los campos");
            return false;
        }

        if (titulo.length < 3 || titulo.length > 30) {
            Swal.showValidationMessage(
                "El titulo del evento debe tener entre 3 y 30 caracteres"
            );
            return false;
        }

        if (!/^[a-zA-Z0-9_ ]+$/.test(titulo)) {
            Swal.showValidationMessage(
                "El título solo puede contener letras, números, espacios y guiones bajos"
            );
            return false;
        }

        if (titulo.length < 3 || titulo.length > 60) {
            Swal.showValidationMessage(
                "La descripción del evento debe tener entre 3 y 60 caracteres"
            );
            return false;
        }

        if (!/^[a-zA-Z0-9_ ]+$/.test(descripcion)) {
            Swal.showValidationMessage(
                "La descripción solo puede contener letras, números, espacios y guiones bajos"
            );
            return false;
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            Swal.showValidationMessage("La fecha debe estar en formato YYYY-MM-DD");
            return false;
        }

        if (!/^\d{2}:\d{2}$/.test(hora)) {
            Swal.showValidationMessage("La hora debe estar en formato HH:MM");
            return false;
        }

        const tiposValidos = ["evento", "reunión", "Evento", "Reunion"];
        if (!tiposValidos.includes(tipo)) {
            Swal.showValidationMessage("El evento solo puede ser de tipo evento o reunión");
            return false;
        }

        return { titulo, descripcion, fecha, hora, tipo };
        },

    });
    if (formValues) {
        return {
            titulo: formValues.titulo,
            descripcion: formValues.descripcion,
            fecha: formValues.fecha,
            hora: formValues.hora,
            tipo: formValues.tipo,
        };
    }
}

export const useEditEvent = (fetchEvents) => {
    const handleEditEvent = async (id, Event) => {
        try {
            const formValues = await showEditEventModal(Event);
            if (!formValues) return;

            const response = await updateEventById(id, formValues);
            if (response) {
                await fetchEvents();
            }
        } catch (error) {
            console.error("Error al editar evento:", error);
        }
    };

    return { handleEditEvent };
};

export default useEditEvent;
