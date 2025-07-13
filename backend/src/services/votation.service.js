import Active from "../entity/activeParticipants.entity.js";
import Vote from "../entity/vote.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getResultadosVotacion() {
    const activeRepo = AppDataSource.getRepository(Active);
    const voteRepo = AppDataSource.getRepository(Vote);

    const candidatosRaw = await activeRepo.find({ relations: ["user", "votes"] });
    const candidatos = candidatosRaw.map(c => ({
        id: c.id,
        username: c.user?.username || "",
        cargo: c.cargo,
        cantidad_votos: Array.isArray(c.votes) ? c.votes.length : 0,
    }));

    candidatos.sort((a, b) => b.cantidad_votos - a.cantidad_votos);

    const votantesRaw = await voteRepo.find({ select: ["rut_votante"] });
    const votantes = votantesRaw.map((v) => ({
        rut: v.rut_votante,
        voto_emitido: true,
    }));

    return { candidatos, votantes };
}
