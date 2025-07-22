import { AppDataSource } from "../config/configDb.js";
import { Vote } from "../entity/vote.entity.js";
import { ActiveParticipantsEntity} from "../entity/activeParticipants.entity.js";
import { In } from "typeorm";


export async function getResultadosVotacion() {
  const participanteRepo = AppDataSource.getRepository(ActiveParticipantsEntity);
  const voteRepo = AppDataSource.getRepository(Vote);

  const cargos = ["Presidente", "Tesorero", "Secretario"];

  // Obtener todos los votos
  const votos = await voteRepo.find();

  // Contar votos por rut_candidato
  const conteoVotos = votos.reduce((acc, voto) => {
    acc[voto.rut_candidato] = (acc[voto.rut_candidato] || 0) + 1;
    return acc;
  }, {});

  // Obtener todos los candidatos
  const candidatosRaw = await participanteRepo.find({
    where: { cargo: In(cargos) },
  });

  // Mapear candidatos con cantidad de votos
  const candidatos = candidatosRaw.map(candidato => ({
    rut: candidato.rut,
    nombre: candidato.nombre,
    apellido: candidato.apellido,
    cargo: candidato.cargo,
    cantidad_votos: conteoVotos[candidato.rut] || 0,
  }));

  // Ordenar por cantidad de votos descendente
  candidatos.sort((a, b) => b.cantidad_votos - a.cantidad_votos);

  // Obtener votantes únicos
  const votantesUnicos = Array.from(new Set(votos.map(v => v.rut_votante))).map(rut => ({
    rut,
    voto_emitido: true,
  }));

  return { candidatos, votantes: votantesUnicos };
}

export async function getResultadosVotacionActivos() {
    const participanteRepo = AppDataSource.getRepository(ActiveParticipantsEntity);

    // Obtener todos los participantes activos con sus votos relacionados
    const participantesActivos = await participanteRepo.find({
        relations: ["votes"],
        select: ["rut", "nombre", "apellido"]
    });
    
    // Crea una lista de candidatos
    const candidatos = candidatosRaw.map(candidato => {
    return {
        id: candidato.id,
        nombre: candidato.nombre,
        apellido: candidato.apellido,
        cargo: candidato.cargo,
        cantidad_votos: candidato.votes ? candidato.votes.length : 0
    };
});

    // Mapear los resultados para indicar si votó o no
    const votos = participantesActivos.map(participante => ({
        rut: participante.rut,
        nombre: participante.nombre,
        apellido: participante.apellido,
        voto: participante.votes && participante.votes.length > 0 ? "Votó" : "No votó"
    }));

    return { votos };
}
