import { AppDataSource } from "../config/configDb.js";
import { Vote } from "../entity/vote.entity.js";
import { ActiveParticipantsEntity} from "../entity/activeParticipants.entity.js";
import { In } from "typeorm";


export async function getResultadosVotacion() {
    // Obtiene todos los candidatos con sus usuarios y votos
    /*const candidatosRaw = await AppDataSource.getRepository(ActiveParticipantsEntity).find({
    relations: ["votes"],
    select: ["id", "nombre", "apellido", "cargo"]
    });
    */
const cargos = ["Presidente", "Tesorero", "Secretario"];

const candidatosRaw= await AppDataSource.getRepository(ActiveParticipantsEntity).find({
    relations: ["votes"],
    select: ["rut", "nombre", "apellido", "cargo"],
    where: {
        cargo: In(cargos)
    }
});
    // Crea una lista de candidatos
    const candidatos = candidatosRaw.map(candidato => {
    return {
        rut: candidato.rut,
        nombre: candidato.nombre,
        apellido: candidato.apellido,
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

export async function getResultadosVotacionActivos() {
    // Obtiene todos los participantes activos con sus votos
    const participantesActivos = await AppDataSource.getRepository(ActiveParticipantsEntity).find({
        relations: ["votes"],
        select: ["rut", "nombre", "apellido"]
    });

    // Crea una lista de participantes activos
    const votos = participantesActivos.map(participante => {
        return {
            rut: participante.rut,
            nombre: participante.nombre,
            apellido: participante.apellido,
            voto: participante.votes.length > 0 ? "Votó" : "No votó"
        };
    });

    // Devuelve los resultados
    return { votos };
}