"use strict"
import Meeting from "../entity/meeting.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { meetingValidation } from "../validations/meeting.validation.js";

export async function getMeeting(req, res) {
    try {
    // Obtener el repositorio de reuniones y buscar todas las reuniones
    const meetingRepository = AppDataSource.getRepository(Meeting);
    const meetings = await meetingRepository.find();

    res.status(200).json({ message: "Reuniones encontradas: ", data: meetings });
    } catch (error) {
    console.error("Error en meeting.controller.js -> getMeeting(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
    }
}

export async function getMeetingById(req, res) {
    try {
    // Obtener el repositorio de reunion y buscar un reunion por ID
    const meetingRepository = AppDataSource.getRepository(Meeting);
    const { id } = req.params;
    const meeting = await meetingRepository.findOne({ where: { id } });

    // Si no se encuentra la reunion, devolver un error 404
    if (!meeting) {
        return res.status(404).json({ message: "Reunion no encontrada." });
    }

    res.status(200).json({ message: "Reunion encontrada: ", data: meeting });
    } catch (error) {
    console.error("Error en meeting.controller.js -> getMeetingById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
    }
}
export async function createMeeting(req, res) {
    try {
    const { body } = req;

    const { error } = meetingValidation.validate(body);

    if (error) {
        return res.status(400).json({message: "Error de validación", error: error.message});
    }
    // Crear el repositorio de reuniones
    const meetingRepository = AppDataSource.getRepository(Meeting);
    const meeting = meetingRepository.create(body);

    await meetingRepository.save(meeting);

    res
    .status(201)
    .json({message: "Reunion creada con éxito",data: meeting});
    } catch (error) {
    console.error("Error en meeting.controller.js -> createMeeting(): ", error);
    return res.status(500).json({message: "Error interno del servidor", error: error.message});
    }
}
export async function updateMeetingById(req, res) {
    try {
    // Obtener el repositorio de reunion y buscar una reunion por ID
    const meetingRepository = AppDataSource.getRepository(Meeting);
    const { id } = req.params;
    const { titulo, descripcion, fecha, hora, lugar} = req.body;
    const meeting = await meetingRepository.findOne({ where: { id } });

    // Si no se encuentra ls reunion, devolver un error 404
    if (!meeting) {
        return res.status(404).json({ message: "Reunion no encontrada." });
    }

    // Validar que al menos uno de los campos a actualizar esté presente
    meeting.titulo = titulo || meeting.titulo;
    meeting.descripcion = descripcion || meeting.descripcion;
    meeting.fecha = fecha || meeting.fecha;
    meeting.hora = hora || meeting.hora;
    meeting.lugar = lugar || meeting.lugar;

    // Guardar los cambios en la base de datos
    await meetingRepository.save(meeting);

    res
    .status(200)
    .json({ message: "Reunion actualizada exitosamente.", data: meeting});
    } catch (error) {
    console.error("Error en meeting.controller.js -> updateMeetingById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
    }
}

export async function deleteMeetingById(req, res) {
    try {
    // Obtener el repositorio de reunion y buscar la reunion por ID
    const meetingRepository = AppDataSource.getRepository(Meeting);
    const { id } = req.params;
    const meeting = await meetingRepository.findOne({ where: { id } });

    // Si no se encuentra la reunion, devolver un error 404
    if (!meeting) {
        return res.status(404).json({ message: "Reunion no encontrada." });
    }

    // Eliminar la reunion de la base de datos
    await meetingRepository.remove(meeting);

    res.status(200).json({ message: "Reunion eliminada exitosamente." });
    } catch (error) {
    console.error("Error en meeting.controller.js -> deleteMeetingById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
    }
}