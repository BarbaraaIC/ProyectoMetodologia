import { useEffect } from 'react';
import '@styles/movimientos.css';
import useGetMovimientos from '@hooks/movimientos/useGetMovimientos.jsx'; 
import useDeleteMovimiento from '@hooks/movimientos/useDeleteMovimiento.jsx';
import useEditMovimiento from '@hooks/movimientos/useEditMovimiento.jsx';
import useCreateMovimiento from '@hooks/movimientos/useCreateMovimiento.jsx';

const Movimientos = () => {
    const { movimientos, fetchMovimientos } = useGetMovimientos();
    const { handleDeleteMovimiento } = useDeleteMovimiento(fetchMovimientos);
    const { handleeditMovimiento } = useEditMovimiento(fetchMovimientos);
    const { handleCreateMovimiento } = useCreateMovimiento(fetchMovimientos);


    useEffect(() => {
      fetchMovimientos();
    }, []);


    return (
      <div className="movimientos-page">
        <div className="movimientos-header">
        <h2> Movimientos Financieros</h2>
        <button className="movimientos-addbtn" onClick={() => handleCreateMovimiento()}>Añadir</button>
        </div>

        <table className="movimientos-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Comprobante</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody> 
            {Array.isArray(movimientos) && movimientos.length > 0 ? (
              movimientos.map((movimiento) => (
               <tr key={movimiento.id}>
                 <td>{movimiento.tipo}</td>
                 <td>{movimiento.monto}</td>
                 <td>{movimiento.categoria}</td>
                 <td>{movimiento.descripcion}</td>
                 <td>
                  {movimiento.comprobanteUrl ? (
                  <a
                    href={`http://localhost:3000${movimiento.comprobanteUrl.replace(/\\/g, "/")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                      Ver Comprobante
                  </a>
                  ) : (
                    "Sin archivo"
                 )}
                  </td>
                 <td>
                 <button className="edit" onClick={() => handleeditMovimiento(movimiento.id, movimiento)}>Editar</button>
                 <button className="delete" onClick={() => handleDeleteMovimiento(movimiento.id)}>Eliminar</button>
               </td>
               </tr> 
              ))
            ) : (
                <tr>
                   <td colSpan="6">No hay movimientos disponibles</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
  );
};

export default Movimientos;
