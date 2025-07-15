"use strict"
import { Vote }from "../entity/vote.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { getResultadosVotacion } from "../services/votation.service.js";
import { ActiveParticipantsEntity } from "../entity/activeParticipants.entity.js";
import { votationValidation } from "../validations/votation.validation.js";
import { In } from "typeorm";

export async function postularCandidatos(req, res) {
    try {
        const { body } = req;
        
            const { error } = votationValidation.validate(body);
        
            if (error) {
                return res.status(400).json({message: "Error de validación", error: error.message});
            }

    const votationRepo = AppDataSource.getRepository(ActiveParticipantsEntity);

    const { rut, cargo} = req.body;
    
    /* // Verificar si el correo ya existe
    const existingEmail = await votationRepo.findOne({ where: { email } });
    if (existingEmail) {
        return res.status(400).json({ message: "Ya existe un participante con este correo electrónico." });
    }*/
    
    const existingParticipant = await votationRepo.findOne({ where: { rut } });
    if (existingParticipant) {
        votationRepo.update(existingParticipant.id, { cargo });
        const futuraDirectiva ={
            id: existingParticipant.id,
            nombre: existingParticipant.nombre|| "",
            apellido: existingParticipant.apellido || "",
            cargo: existingParticipant.cargo,
        }
        return res.status(200).json({ message: `Participante ${futuraDirectiva.nombre} ${futuraDirectiva.apellido} actualizado a cargo: ${cargo}`});
    }else{
        return res.status(400).json({ message: "No existe un participante con este RUT." });
    }
    // Verificar si el rut ya existe

        // Crear nueva postulación con el usuario relacionado
        /*const nuevoCandidato = votationRepo.create({ rut, nombre, apellido, cargo, password, email});
        await votationRepo.save(nuevoCandidato);

        return res.status(201).json({ message: "Candidato postulado exitosamente." });
*/
    } catch (error) {
        console.error("Error al postular:", error);
        return res.status(500).json({ message: "Error interno del servidor.",error: error.message });
    }
}


export async function mostrarCandidatos(req, res) {
try {
    const cargos = ["Presidente", "Tesorero", "Secretario"];
    const activeRepo = AppDataSource.getRepository(ActiveParticipantsEntity);
    const candidatos = await activeRepo.find({relations: ["votes"],
        where: {
            cargo: In(cargos)
        }
    });
    
    if (candidatos.length === 0) {
    return res.status(400).json({ message: "No hay candidatos postulados." });
    }

    return res.status(200).json({ message: "Candidatos Encontrados.", candidatos });
} catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
}
}

export async function emitirVoto(req, res) {
  try {
    const { rut_votante, nombre_candidato, apellido_candidato, cargo} = req.body;

    if (!rut_votante || !nombre_candidato || !apellido_candidato || !cargo) {
      return res.status(400).json({ message: "Verifica los datos para emitir el voto." });
    }

    const voteRepo = AppDataSource.getRepository(Vote);
    const activeRepo = AppDataSource.getRepository(ActiveParticipantsEntity);

    // Verificar si ya voto
    const votoExistente = await voteRepo.findOneBy({ rut_votante });
    if (votoExistente) {
      return res.status(400).json({ message: "Este votante ya ha emitido su voto." });
    }

    // Verificar si el candidato existe
    const candidato = await activeRepo.findOneBy({ id: id_candidato });
    if (!candidato) {
      return res.status(404).json({ message: "Candidato no encontrado." });
    }

    // Crear el voto
    const nuevoVoto = voteRepo.create({
      rut_votante,
      nombre_candidato: candidato.nombre,
      apellido_candidato: candidato.apellido,
      cargo: candidato.cargo,
      active: candidato,
    });

    await voteRepo.save(nuevoVoto);

    return res.status(201).json({ message: "Voto emitido exitosamente." });
  } catch (error) {
    console.error("Error al emitir el voto:", error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
}

export async function mostrarResultadoVotacion(req, res) {
try {
    const activeRepo = AppDataSource.getRepository(Active);
    const voteRepo = AppDataSource.getRepository(Vote);

    const candidatosRaw = await activeRepo.find({ relations: ["user", "votes"] });
    const candidatos = candidatosRaw.map(c => ({
        id: c.id,
        nombre: c.user?.nombre || "",
        apellido: c.user?.apellido || "",
        cargo: c.cargo,
        cantidad_votos: Array.isArray(c.votes) ? c.votes.length : 0,
    }));

    candidatos.sort((a, b) => b.cantidad_votos - a.cantidad_votos);

    const votantesRaw = await voteRepo.find({ select: ["rut_votante"] });
    const votantes = votantesRaw.map((v) => ({
        rut: v.rut_votante,
        voto_emitido: true,
    }));

    return res.status(200).json({ candidatos, votantes });
} catch (error) {
    console.error("Error al mostrar resultados:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
}
}

export async function getResultadosVotacionPDF(req, res) {
    try {
        const resultados = await getResultadosVotacion();
        return res.status(200).json(resultados);
    } catch (error) {
        console.error("Error al obtener resultados de votación:", error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
}