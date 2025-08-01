import Swal from "sweetalert2"
import { createArchivo } from "../../services/archivo.service.js";

async function addArchivoPopup() {
    const { value: formValues } = await Swal.fire({
        title: "Añadir Documento",
        html: `
        <div>
            <label for="swal2-nombre">Nombre del Archivo</label>
            <input id="swal2-nombre" class="swal2-input" placeholder="Nombre del archivo">
        </div>
        <div>
            <label for="swal2-archivo">Archivo</label>
            <input id="swal2-archivo" class="swal2-file" type="file" accept="application/pdf">
        </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Añadir",
        
        preConfirm: () => {
            const nombre = document.getElementById("swal2-nombre").value;
            const archivo = document.getElementById("swal2-archivo").files[0];

            if (!nombre || !archivo) {
                Swal.showValidationMessage("Por favor, complete todos los campos");
                return false;
            }  
            if (!archivo || archivo.type !== "application/pdf") {
                Swal.showValidationMessage("Por favor, debe subir un archivo PDF");
                return;
            }  

            return { nombre, archivo };
        }
        });
        if (formValues) {
            return {
        nombre: formValues.nombre,
        archivo: formValues.archivo
    };
    }
    return formValues;
}


export const usePostArchivo = (fetchArchivos) => {
    const archivoData = async () => {
        try {
            const formValues = await addArchivoPopup();
            if (!formValues) {
                return;
            }
            const formData = new FormData();
            formData.append("archivo", formValues.archivo);
            formData.append("nombre", formValues.nombre);
            const response = await createArchivo(formData);
            if (response) {
                await fetchArchivos();
                Swal.fire("Creado", "El documento ha sido creado exitosamente", "success");
            }
        } catch (error) {
            console.error("Error al crear el archivo:", error);
        }
    };
    return { archivoData };
    };

export default usePostArchivo;
