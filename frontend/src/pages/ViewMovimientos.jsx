import { useEffect } from 'react';
import '@styles/movimientos.css';
import useGetMovimientos from '@hooks/movimientos/useGetMovimientos.jsx';

const ViewMovimientos = () => {
    const { movimientos, fetchMovimientos } = useGetMovimientos();

    useEffect(() => {
      fetchMovimientos();
    }, []);

    return (
      <div className="movimientos-page">
        <div className="movimientos-header">
          <h2> Movimientos Financieros</h2>
        </div>

        <table className="movimientos-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Comprobante</th>
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
                </tr> 
              ))
            ) : (
              <tr>
                <td colSpan="5">No hay movimientos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
};

export default ViewMovimientos;