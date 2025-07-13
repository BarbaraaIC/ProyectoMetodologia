
// Obtener el listado de vecinos
export async function getList(req, res) {
  try{
    const resultado = await pool.query("SELECT * FROM listado ORDER BY id_listado ASC");
    res.json(resultado.rows);
  }catch (error) {
    res.status(500).json({ error: "Error al obtener el listado" });
  }
}
// Crear un nuevo integrante para el listado
export async function createList(req, res) {
  const { id_listado, rut, nombre, apellido } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO listado VALUES ($1, $2, $3, $4) RETURNING *",
      [id_listado, rut, nombre, apellido]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al añadir nuevo integrante" });
  }
}

// Actualizar un integrante del listado
export async function updateList(req, res) {
  const { id_listado } = req.params;
  const { rut, nombre, apellido } = req.body;
  try {
    const result = await pool.query(
      "UPDATE listado SET rut = $1, nombre = $2, apellido = $3 WHERE id_listado = $4 RETURNING *",
      [rut, nombre, apellido, id_listado]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: "Integrante no encontrado" });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar integrante del listado" });
  }
}

// Eliminar un vecino del listado
export async function deleteList(req, res) {
  const { id_listado } = req.params;
  try {
    const result = await pool.query("DELETE FROM listado WHERE id_listado = $1", [id_listado]);
    if (result.rowCount === 0) return res.status(404).json({ error: "Vecino no encontrado" });
    res.json({ message: "Vecino eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar al Vecino" });
  }
}