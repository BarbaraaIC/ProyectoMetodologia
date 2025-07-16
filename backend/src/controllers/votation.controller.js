"use strict"
import { Vote } from "../entity/vote.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { getResultadosVotacion } from "../services/votation.service.js";
import { ActiveParticipantsEntity } from "../entity/activeParticipants.entity.js";
import { votationValidation, emitirVotoValidation} from "../validations/votation.validation.js";

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

/*export async function emitirVoto(req, res) {
    try {
    const {body} = req;
    const { error } = emitirVotoValidation.validate(body);
        
            if (error) {
                return res.status(400).json({message: "Error de validación", error: error.message});
            }
    const {rut_votante, rut_candidato, nombre_candidato, apellido_candidato, cargo} = req.body;

    if (!rut_votante || !rut_candidato|| !nombre_candidato || !apellido_candidato || !cargo) {
    return res.status(400).json({ message: "Verifica los datos para emitir el voto." });
    }
    const rut = rut_votante;
    const voteRepo = AppDataSource.getRepository(Vote);
    const votationRepo = AppDataSource.getRepository(ActiveParticipantsEntity);
    const habilitadoVoto = await votationRepo.findOne({ where: { rut} });

     // Verificar si ya voto
    const votosExistentes = await voteRepo.find({ rut_votante });
   // console.log("Votos existentes:", votosExistentes);
    if (votosExistentes.length > 0) {
            votosExistentes.forEach(voto => {
            const votoVecino = {
            rut_votante: voto.rut_votante,
            rut_candidato: voto.rut_candidato,
            nombre_candidato: voto.nombre_candidato || "",
            apellido_candidato: voto.apellido_candidato || "",
            cargo: voto.cargo || "",
        };
        console.log("nombre", votoVecino.nombre_candidato);
        if(votoVecino.rut_votante === rut_votante && votoVecino.cargo === cargo) {
            return res.status(400).json({ message: "Ya has votado por este cargo." });
        }else{
             // Verificar si el candidato existe
    const candidato = await votationRepo.findOneBy({ rut: rut_candidato });
    if (!candidato) {
    return res.status(404).json({ message: "Candidato no encontrado." });
    }
    if (habilitadoVoto) {
          // Crear el voto
    const nuevoVoto = voteRepo.create({
        rut_votante,
        rut_candidato,
        nombre_candidato: habilitadoVoto.nombre,
        apellido_candidato: habilitadoVoto.apellido,
        cargo: habilitadoVoto.cargo,
    });

    await voteRepo.save(nuevoVoto);

    return res.status(201).json({ message: "Voto emitido exitosamente." });
    }else{
        return res.status(400).json({ message: "No existe un participante con este RUT." });
    };
        }
    });

    return res.status(400).json({ message: "Este votante ya ha emitido los tres votos." });
    }
    

  } catch (error) {
    console.error("Error al emitir el voto:", error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
}

*/
export async function emitirVoto(req, res) {
  try {
    const { body } = req;
    const { error } = emitirVotoValidation.validate(body);

    if (error) {
      return res.status(400).json({ message: "Error de validación", error: error.message });
    }

    const { rut_votante, rut_candidato, nombre_candidato, apellido_candidato, cargo } = body;

    if (!rut_votante || !rut_candidato || !nombre_candidato || !apellido_candidato || !cargo) {
      return res.status(400).json({ message: "Verifica los datos para emitir el voto." });
    }

    const voteRepo = AppDataSource.getRepository(Vote);
    const votationRepo = AppDataSource.getRepository(ActiveParticipantsEntity);

    // Verificar si el votante está habilitado
    const habilitadoVoto = await votationRepo.findOne({ where: { rut: rut_votante } });
    if (!habilitadoVoto) {
      return res.status(400).json({ message: "No existe un participante con este RUT." });
    }

    // Obtener votos existentes del votante
    const votosExistentes = await voteRepo.find({ where: { rut_votante } });

    // Validar si ya votó por este cargo
    const yaVotoPorEsteCargo = votosExistentes.some(voto => voto.rut_candidato === rut_candidato);
    console.log("yaVotoPorEsteCargo:", yaVotoPorEsteCargo);
    if (yaVotoPorEsteCargo) {
        const infoYaVoto = votosExistentes.find(voto => voto.rut_candidato === rut_candidato);
    
      return res.status(400).json({ message: `Ya has votado por el cargo de ${infoYaVoto.cargo}.` });
    }

    // Validar si ya emitió 3 votos
    if (votosExistentes.length >= 3) {
      return res.status(400).json({ message: "Este votante ya ha emitido los tres votos permitidos." });
    }

    // Verificar si el candidato existe
    const candidato = await votationRepo.findOneBy({ rut: rut_candidato });
    if (!candidato) {
      return res.status(404).json({ message: "Candidato no encontrado." });
    }

    // Crear y guardar el nuevo voto
    const nuevoVoto = voteRepo.create({
        rut_votante,
        rut_candidato,
        nombre_candidato: candidato.nombre,
        apellido_candidato: candidato.apellido,
        cargo: candidato.cargo,
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
    const activeRepo = AppDataSource.getRepository(ActiveParticipantsEntity);
    const voteRepo = AppDataSource.getRepository(Vote);

    const candidatosRaw = await activeRepo.find({ relations: ["ac", "votes"] });
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