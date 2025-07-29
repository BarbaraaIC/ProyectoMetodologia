import Swal from "sweetalert2";

export const addRegisterAttendance = async (participants) => {
    const formHtml = participants.map(p => `
        <div style="text-align: left; margin-bottom: 5px;">
        <input type="checkbox" id="p-${p.id}" />
        <label for="p-${p.id}">${p.nombre}</label>
        </div>
    `).join("");

    const { isConfirmed, value } = await Swal.fire({
        title: "Marcar asistencia",
        html: `<form id="asistencia-form">${formHtml}</form>`,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        focusConfirm: false,
        preConfirm: () => {
        const form = document.getElementById("asistencia-form");
        return participants.map(p => ({
            participanteId: p.id,
            presente: form.querySelector(`#p-${p.id}`).checked
        }));
        }
    });

    if (!isConfirmed) return null;
    return value;
};