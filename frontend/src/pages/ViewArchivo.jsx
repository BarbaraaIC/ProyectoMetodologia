import "@styles/archivo.css";
import useGetArchivo from "@hooks/archivos/useGetArchivo.jsx";
import { usePostArchivo } from "@hooks/archivos/usePostArchivo.jsx";
import { useEffect } from "react";

const ViewArchivo = () => {
    const { archivos, fetchArchivos } = useGetArchivo();
    const { archivoData } = usePostArchivo(fetchArchivos);

  /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        fetchArchivos();
  }, [])


  return (
    <div className="arch-page">
      <div className="arch-header">
      <h2>Lista de Documentos</h2>
      <button className="arch-addbtn" onClick={()=> archivoData()}>Añadir Documento</button>
      </div>
      <table className="arch-table">
        <thead>
          <tr>
            <th>Nombre del archivo</th>
            <th>Fecha de subida</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(archivos) && archivos.length > 0 ? (
            archivos.map((archive) => {
                return (
                    <tr key={archive.id}>
                    <td>{archive.nombre}</td>
                    <td>{archive.createdAt}</td>
                    <td>
                      <a href={archive.archivo} target="_blank" rel="noopener noreferrer">
                        Ver Documento
                      </a>
                    </td>
                </tr>
                )
            })
          ) : (
            <tr>
              <td colSpan="4">No hay Documentos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewArchivo;