import "@styles/listVotation.css";
import { useEffect } from "react";
import useGetCandidatos from "@hooks/votation/useGetCandidatos.jsx";
const Candidatos = () => {
    const { candidatos, fetchCandidatos} = useGetCandidatos();

    useEffect(() => {
        fetchCandidatos();
        console.log(candidatos);
    }, [])

    console.log(Array.isArray(candidatos))

    return(
        <div className="candidatos-page">
            <h2>Lista de Candidatos</h2>
            <table className="candidatos-table">
                <thead>
                    <tr>
                        <th>Rut</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Cargo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(candidatos) && candidatos.length > 0 ? (
                        candidatos.map((candidato) => (
                            <tr key={candidato.id}>
                                <td>{candidato.rut}</td>
                                <td>{candidato.nombre}</td>
                                <td>{candidato.apellido}</td>
                                <td>{candidato.cargo}</td>
                                <td>
                                    <button className="emitir">EmitirVoto</button>
                                </td>
                            </tr>
                            
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No hay candidatos disponibles</td>
                        </tr>
                    )

                    }
                </tbody>
            </table>
        </div>
    )
}

export default Candidatos;
