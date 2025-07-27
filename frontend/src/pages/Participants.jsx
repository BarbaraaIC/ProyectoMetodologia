import "@styles/Participants.css";
import useGetParticipants  from "@hooks/participants/useGetParticipants.jsx";
import useDeleteParticipants from "@hooks/participants/useDeleteParticipants.jsx";
import useEditParticipants from "@hooks/participants/useEditParticipants.jsx";
import { useEffect } from "react";

const Participants = () => {
    const { participants, fetchParticipants } = useGetParticipants();
    const {handleDeleteParticipants} = useDeleteParticipants(fetchParticipants);
    const {handleEditParticipants} = useEditParticipants(fetchParticipants);
    useEffect(() => {
        fetchParticipants();
        console.log(participants);
    },[]);

    return (
        <div className="participants-page">
            <h2>Lista de Participantes</h2>    
            <table className="participants-table">
                <thead>
                    <tr>
                        <th>Rut</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Cargo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
        <tbody>
           {Array.isArray(participants) && participants.length > 0 ? (
            participants.map((participant) => (
                <tr key={participant.id}>
                    <td>{participant.rut}</td>
                    <td>{participant.nombre}</td>
                    <td>{participant.apellido}</td>
                    <td>{participant.email}</td>
                    <td>{participant.cargo}</td>
                    <td>
                        <button className="edit" onClick={()=>handleEditParticipants(participant.id)}>Editar</button>
                        <button className="delete" onClick={()=> handleDeleteParticipants(participant.id)}>Eliminar</button>
                    </td>
                </tr>
            ))
           ) : (
            <tr>
                <td colSpan="4">No hay participantes disponibles</td>
            </tr>
           )

           }
             </tbody>
        </table>
    </div>
    )
}

export default Participants;