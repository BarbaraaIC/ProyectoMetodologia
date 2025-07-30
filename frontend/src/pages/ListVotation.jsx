import "@styles/listVotation.css";
import { useEffect } from "react";
import useGetCandidatos from "@hooks/votation/useGetCandidatos.jsx";
import usePostEmitirVoto from "@hooks/votation/usePostEmitirVoto.jsx";
const Candidatos = () => {
    const { candidatos, fetchCandidatos} = useGetCandidatos();
    const {handlePostEmitirVoto} = usePostEmitirVoto(fetchCandidatos);

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        fetchCandidatos();
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
                                    <button className="emitir" onClick={() =>handlePostEmitirVoto()}>EmitirVoto</button>
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
