import "@styles/archivo.css";
import useGetArchivo from "../hooks/archivo/useGetArchivo.jsx";

const archivo = () => {
  const { archivo, fetchArchivo } = useGetArchivo();
  

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchArchivo();
  }, []);


  return (
    <div className="arch-page">
      <h2>Lista de Documentos</h2>
      <table className="arch-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del archivo</th>
            <th>Fecha de subida</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(archivo) && archivo.length > 0 ? (
            archivo.map((archivo) => {
              <tr key={archivo.id}>
                <td>{archivo.nombre}</td>
                <td>{archivo.createdAt}</td>
                <td>{archivo.archivo}</td>
                </tr>;
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

export default archivo;
