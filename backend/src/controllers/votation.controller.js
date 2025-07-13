"use strict"
import Active, { ParticipantsEntity } from "../entity/activeParticipants.entity.js";
import Vote from "../entity/vote.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { getResultadosVotacion } from "../services/votation.service.js";


export async function postularCandidatos(req, res) {
    try {
        const { rut, nombre, cargo } = req.body;

        if (!rut || !nombre || !cargo) {
            return res.status(400).json({ message: "Faltan datos para la postulación." });
        }

        // Buscar el usuario por rut
        const { UserEntity } = await import("../entity/user.entity.js");
        const userRepo = AppDataSource.getRepository(UserEntity);
        const usuario = await userRepo.findOneBy({ rut });

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado para ese rut." });
        }

        const votationRepo = AppDataSource.getRepository(ParticipantsEntity);

        // Verificar si ya está postulado al mismo cargo
        const candidatoExistente = await votationRepo.findOneBy({ rut, cargo });
        if (candidatoExistente) {
            return res.status(400).json({ message: "Este miembro ya está postulado a este cargo." });
        }

        // Crear nueva postulación con el usuario relacionado
        const nuevoCandidato = votationRepo.create({ rut, cargo, user: usuario });
        await votationRepo.save(nuevoCandidato);

        return res.status(201).json({ message: "Candidato postulado exitosamente." });

    } catch (error) {
        console.error("Error al postular:", error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
}


export async function mostrarCandidatos(req, res) {
try {
    const activeRepo = AppDataSource.getRepository(Active);
    const candidatos = await activeRepo.find({relations: ["user"] });
    
     if (candidatos.length === 0) {
    return res.status(400).json({ message: "No hay candidatos postulados." });
    }

    const resultado = candidatos.map(c => ({
        id: c.id,
        username: c.user?.username || "",
        cargo: c.cargo,
    }));

    return res.status(200).json({ message: "Candidatos Encontrados.", candidatos });
} catch (error) {
    console.error("Error al mostrar candidatos:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
}
}

export async function emitirVoto(req, res) {
  try {
    const { rut_votante, id_candidato } = req.body;

    if (!rut_votante || !id_candidato) {
      return res.status(400).json({ message: "Faltan datos para emitir el voto." });
    }

    const voteRepo = AppDataSource.getRepository(Vote);
    const activeRepo = AppDataSource.getRepository(Active);

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