import { editMovimiento } from "@services/movimientos.service";
import Swal from "sweetalert2";

async function editMovimientoAlert(movimiento) {
  const { value: formValues } = await Swal.fire({
    title: "Editar Movimiento",
    html:
      `<input id="swal-tipo" class="swal2-input" placeholder="Tipo" value="${movimiento.tipo}">` +
      `<input id="swal-monto" class="swal2-input" placeholder="Monto" type="number" value="${movimiento.monto}">` +
      `<input id="swal-categoria" class="swal2-input" placeholder="Categoría" value="${movimiento.categoria}">` +
      `<input id="swal-descripcion" class="swal2-input" placeholder="Descripción" value="${movimiento.descripcion}">` +
      `<input id="swal-comprobante" class="swal2-file" type="file">`,
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      const tipo = document.getElementById("swal-tipo").value;
      const monto = parseFloat(document.getElementById("swal-monto").value);
      const categoria = document.getElementById("swal-categoria").value;
      const descripcion = document.getElementById("swal-descripcion").value;
      const comprobante = document.getElementById("swal-comprobante").files[0];

      if (!tipo || !monto || !categoria || !descripcion) {
        Swal.showValidationMessage("Todos los campos deben estar completos");
        return;
      }

      return { tipo, monto, categoria, descripcion, comprobante };
    },
  });

  return formValues;
}

export const useEditMovimiento = (fetchMovimientos) => {
  const handleeditMovimiento = async (movimientoId, movimiento) => {
    try {
      const formValues = await editMovimientoAlert(movimiento);
      if (formValues) {
        const formData = new FormData();
        formData.append("tipo", formValues.tipo);
        formData.append("monto", formValues.monto);
        formData.append("categoria", formValues.categoria);
        formData.append("descripcion", formValues.descripcion);

        const comprobanteFile = formValues.comprobante; 
        if (comprobanteFile) {
          formData.append("comprobante", comprobanteFile);
        }

        const response = await editMovimiento(movimientoId, formData);
        if (response) {
          await fetchMovimientos();
          Swal.fire("Actualizado", "El movimiento fue actualizado correctamente", "success");
        }
      }
    } catch (error) {
      console.log("Error al editar movimiento:", error);
    }
  };

  return { handleeditMovimiento };
};

export default useEditMovimiento;