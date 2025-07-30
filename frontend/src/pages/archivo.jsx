import "@styles/archivo.css";
import useGetArchivo from "@hooks/archivos/useGetArchivo.jsx";
import { useEffect } from "react";

const Archivo = () => {
  const { archivos, fetchArchivos } = useGetArchivo();

  /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        fetchArchivos();
  }, [])


  return (
    <div className="arch-page">
      <h2>Lista de Documentos</h2>
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
                    <td>{archive.archivo}</td>
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

export default Archivo;
