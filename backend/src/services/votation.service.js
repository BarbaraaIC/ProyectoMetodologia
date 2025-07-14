import { AppDataSource } from "../config/configDb.js";
import Active from "../entity/activeParticipants.entity.js";
import Vote from "../entity/vote.entity.js";

export async function getResultadosVotacion() {
    // Obtiene todos los candidatos con sus usuarios y votos
    const candidatosRaw = await AppDataSource.getRepository(Active).find({ relations: ["user", "votes"] });

    // Crea una lista de candidatos con los datos importantes
    const candidatos = candidatosRaw.map(candidato => {
        return {
            id: candidato.id,
            username: candidato.user ? candidato.user.username : "",
            cargo: candidato.cargo,
            cantidad_votos: candidato.votes ? candidato.votes.length : 0
        };
    });

    // Ordena los candidatos por cantidad de votos (de mayor a menor)
    candidatos.sort((a, b) => b.cantidad_votos - a.cantidad_votos);

    // Obtiene todos los votos y saca el rut de cada votante
    const votos = await AppDataSource.getRepository(Vote).find({ select: ["rut_votante"] });
    const votantes = votos.map(voto => {
        return {
            rut: voto.rut_votante,
            voto_emitido: true
        };
    });

    // Devuelve los resultados
    return { candidatos, votantes };
}