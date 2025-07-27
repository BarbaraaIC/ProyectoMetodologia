import "@styles/users.css";
import { useEffect } from "react";

const ActiveParticipants = () => {
    const { activeParticipants, fetchActiveParticipants} = useGetActiveParticipants();
    const { handleDeleteActiveParticipants } = useDeleteActiveParticipants(fetchActiveParticipants);
    const { handleEditActiveParticipants } = useEditActiveParticipants(fetchActiveParticipants);

    useEffect(() => {
        fetchActiveParticipants();
    }, []);

    return (
        <div className="activeParticipants-page">
            <h2>Lista Participantes Activos</h2>
            <table className="activeParticipants-table">
                <thead>
                    <tr>
                        
                    </tr>
                </thead>
            </table>

        </div>
            
    )


}