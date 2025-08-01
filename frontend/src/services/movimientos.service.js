import axios from '@services/root.service.js';


export async function GetMovimientos() {
    try {
        const response = await axios.get('/movimientos/');
        console.log("Movimientos obtenidos:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al obtener movimientos:", error);
    }
}

export async function deleteMovimiento(movimientoId) {
    try {
        const response = await axios.delete(`/movimientos/${movimientoId}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar movimiento:", error);
    }
}

export async function editMovimiento(movimientoId, formData) {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(`/movimientos/${movimientoId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al editar movimiento:", error);
  }
}

export async function CreateMovimiento(movimientoData) {
    try {
    const token = localStorage.getItem("token");

    const response = await axios.post(`/movimientos/`, movimientoData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el movimiento:", error);
  }
}