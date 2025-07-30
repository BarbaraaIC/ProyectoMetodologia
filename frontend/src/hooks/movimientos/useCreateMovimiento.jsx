import Swal from "sweetalert2";
import { CreateMovimiento } from "@services/movimientos.service.js";

async function addMovimientoPopup() {
  const { value: formValues } = await Swal.fire({
    title: "Agregar Movimiento",
    html:
      `<input id="swal-tipo" class="swal2-input" placeholder="Tipo">` +
      `<input id="swal-monto" class="swal2-input" placeholder="Monto" type="number">` +
      `<input id="swal-categoria" class="swal2-input" placeholder="Categoría">` +
      `<input id="swal-descripcion" class="swal2-input" placeholder="Descripción">` +
      `<input id="swal-comprobante" class="swal2-file" type="file" accept="application/pdf">`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Añadir",
    preConfirm: () => {
      const tipo = document.getElementById("swal-tipo").value;
      const monto = parseFloat(document.getElementById("swal-monto").value);
      const categoria = document.getElementById("swal-categoria").value;
      const descripcion = document.getElementById("swal-descripcion").value;
      const comprobante = document.getElementById("swal-comprobante").files[0]; 

      if (!tipo || !monto || !categoria || !descripcion) {
        Swal.showValidationMessage("Todos los campos deben estar completos");
        return false;
      }

      if (!comprobante || comprobante.type !== "application/pdf") {
        Swal.showValidationMessage("Debes subir un archivo PDF como comprobante");
        return;
      }

      return { tipo, monto, categoria, descripcion, comprobante }; 
    },
  });

  if (formValues) {
    return {
      tipo: formValues.tipo,
      monto: formValues.monto,
      categoria: formValues.categoria,
      descripcion: formValues.descripcion,
      comprobante: formValues.comprobante,
    };
  }

  return formValues; // Retorna null si se cancela
}

export const useCreateMovimiento = (fetchMovimientos) => {
  const handleCreateMovimiento = async () => {
    try {
      const formValues = await addMovimientoPopup();
      console.log(formValues);
      if (!formValues) return;
      // Convertir a FormData
    const formData = new FormData();
    formData.append("tipo", formValues.tipo);
    formData.append("monto", formValues.monto);
    formData.append("categoria", formValues.categoria);
    formData.append("descripcion", formValues.descripcion);
    if (formValues.comprobante) {
      formData.append("comprobante", formValues.comprobante);
    }

      const response = await CreateMovimiento(formData);
      if (response) {
        await fetchMovimientos();
        Swal.fire("Creado", "El movimiento fue creado correctamente", "success");
      }
    } catch (error) {
      console.log("Error al crear el movimiento:", error);
    }
  };

  return { handleCreateMovimiento };
};

export default useCreateMovimiento;